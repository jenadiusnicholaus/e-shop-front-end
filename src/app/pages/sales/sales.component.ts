import { Component, Input, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomAlertService } from "src/app/shared/custom-alert.service";
import { SharedService } from "src/app/shared/custom_http.service";
import { StockItemSales, StockItemsModel } from "../stock-items/model";
import { ModuleStateService } from "../moduleshared.service";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { RepositoryService } from "../repository.service";

@Component({
  selector: "app-sales",
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.scss"],
})
export class SalesComponent implements OnInit {
  submitted = false;
  stockItemModelList: any;
  curentStockItem: any;
  isSalesDisabled = false;
  priceChanged = false;
  stockItemSales: StockItemSales;
  shouldHideFormControl = false;
  constructor(
    public httpShareService: SharedService,
    public customAlert: CustomAlertService,
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private moduleStateService: ModuleStateService,
    private repositoryService: RepositoryService
  ) {}
  createSalesForm: UntypedFormGroup;
  ngOnInit(): void {
    this.createSalesForm = this.formBuilder.group({
      stock_item: ["", [Validators.required]],
      quantity_sold: ["", [Validators.required]],
      price: ["", [Validators.required]],
      product_price_changed: [false, [Validators.required]],
      reason_for_change: ["", [Validators.required]],
      // set default value to today's date
    });
    this.submitted = false;
    // this.createSalesForm.get("reason_for_change").disable();
    this.createSalesForm.get("price").disable();
    this.createSalesForm.get("stock_item").disable();
    this.shouldHideFormControl = false;

    this.moduleStateService.salesState$.subscribe((state) => {
      this.stockItemSales = state;
    });

    this.moduleStateService.currentStockItemState$.subscribe((state) => {
      if (state !== null) {
        this.curentStockItem = state;
        this.feedTheForm(state);
      }
    });

    this.moduleStateService.stockItemList$.subscribe((state) => {
      if (state !== null) {
        this.stockItemModelList = state;
        console.log(this.stockItemModelList);
      }
    });
  }

  get salesForm() {
    return this.createSalesForm.controls;
  }

  createSalesFormSubmit() {
    this.submitted = true;
    console.log(this.createSalesForm.value);
    if (this.createSalesForm.value.quantity_sold === 0) {
      this.customAlert.successmsg(
        "Error in creating sales",
        "Quantity sold cannot be zero",
        "error"
      );
      return;
    }
    const body = {
      stock_item: this.createSalesForm.value.stock_item,
      quantity_sold: this.createSalesForm.value.quantity_sold,
      price: this.curentStockItem.unit_selling_price,
      product_price_changed: false,
      reason_for_change: "",
    };

    const url =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_SALES_BASE_URL +
      `?stock_item_id=${this.curentStockItem.id}`;
    this.httpShareService.post(null, url, body).subscribe(
      (res: any) => {
        console.log(res);

        this.customAlert.successmsg(
          "Success",
          "Sales created successfully",
          "success"
        );
        this.getStockItemSales();
        this.submitted = false;
      },
      (error) => {
        this.customAlert.successmsg(
          "Error in creating sales",
          `${error}`,
          "error"
        );
        this.submitted = false;
      }
    );
  }

  feedTheForm(state) {
    this.createSalesForm.patchValue({
      stock_item: state?.id,
      price: state?.unit_selling_price,
      product_price_changed: false,
      reason_for_change: "",
    });

    if (state.qty === 0) {
      console.log("sales disabled");
      console.log(state);
      console.log(state.qty);
      this.isSalesDisabled = true;
    } else {
      this.isSalesDisabled = false;
    }
  }

  onCheckboxChange($event) {
    this.priceChanged = $event.target.checked;
    if (this.priceChanged) {
      // this.createSalesForm.get("reason_for_change").enable();
      this.shouldHideFormControl = true;

      this.createSalesForm.get("price").enable();
    } else {
      this.shouldHideFormControl = false;
      // this.createSalesForm.get("reason_for_change").disable();
      this.createSalesForm.get("price").disable();
    }
  }

  getStockItemSales() {
    const url =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_SALES_BASE_URL +
      `?stock_item_id=${this.curentStockItem.id}`;
    this.repositoryService.getList(
      url,
      (data: any) => {
        // console.log(res);
        this.stockItemSales = data;
        const newsalesState = data;
        this.moduleStateService.setSalesState(newsalesState);
        this.getCurrentStockItemState();

        // feed the form
      },
      (error) => {
        this.customAlert.successmsg(
          "Error in fetching stock details",
          "Something went wrong, please try again later",
          "error"
        );
      }
    );
  }

  getCurrentStockItemState() {
    const url =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_STOCK_ITEM_OBJ +
      `?stock_item_id=${this.curentStockItem.id}`;

    this.repositoryService.getSingle(
      url,
      (data: any) => {
        this.moduleStateService.setCurrentStockItemState(data);
        this.feedTheForm(data);
      },
      (error) => {
        this.customAlert.successmsg(
          "Error in fetching stock details",
          "Something went wrong, please try again later",
          "error"
        );
      }
    );
  }
}
