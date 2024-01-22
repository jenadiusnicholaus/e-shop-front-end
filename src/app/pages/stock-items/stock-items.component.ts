import { Component, OnInit, ViewChild } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Route } from "@angular/router";
import { NgbModal, NgbNav } from "@ng-bootstrap/ng-bootstrap";
import { CustomAlertService } from "src/app/shared/custom-alert.service";
import { SharedService } from "src/app/shared/custom_http.service";
import { environment } from "src/environments/environment";
import { StockItemSales, StockItemsModel } from "./model";
import { ProductModel } from "../add-new-stock-item/models";
import Swal from "sweetalert2";
import { ModuleStateService } from "../moduleshared.service";
import { RepositoryService } from "../repository.service";

@Component({
  selector: "app-stock-items",
  templateUrl: "./stock-items.component.html",
  styleUrls: ["./stock-items.component.scss"],
})
export class StockItemsComponent implements OnInit {
  stockItemsModel: StockItemsModel[];
  stockItem: StockItemsModel;
  stockId: number;
  submitted = false;
  editStockItemForm: UntypedFormGroup; // bootstrap validation form
  isLoading = false;
  stockItemSales: StockItemSales;
  @ViewChild("customNav") customNav: NgbNav;

  productsModel: ProductModel[];
  error = "";
  STATUS = [
    // ("1", "in-stock"), ("2", "out-stock")),
    { id: "1", name: "in-stock" },
    { id: "2", name: "out-stock" },
  ];

  //   SI_UNIT_CHOICES = (
  //     ("m", "Meter (m)"),
  //     ("kg", "Kilogram (kg)"),
  //     ("g", "Gram (g)"),
  //     ("just_no", "just_no"),
  //     ("pic", "Pic"),
  // )

  SI_UNIT_CHOICES = [
    { id: "m", name: "Meter (m)" },
    { id: "kg", name: "Kilogram (kg)" },
    { id: "g", name: "Gram (g)" },
    { id: "just_no", name: "just_no" },
    { id: "pic", name: "Pic" },
  ];

  constructor(
    public httpShareService: SharedService,
    public customAlert: CustomAlertService,
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private moduleStateService: ModuleStateService,
    private repositoryService: RepositoryService
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.getAllStockList();

    this.editStockItemForm = this.formBuilder.group({
      product: ["", [Validators.required]],
      description: ["", [Validators.required]],
      qty: ["", [Validators.required]],
      qty_in: ["", [Validators.required]],
      unit_price: ["", [Validators.required]],
      unit_estmated_profit: ["", [Validators.required]],
      unit_selling_price: ["", [Validators.required]],
      status: ["", [Validators.required]],
      date_updated: ["", [Validators.required]],
      is_sales_update: [false, [Validators.required]],
    });

    this.getProductsList();
    this.isLoading = false;
  }

  get editStockIform() {
    return this.editStockItemForm.controls;
  }

  getAllStockList() {
    this.route.params.subscribe((params) => {
      this.stockId = +params["ID"]; // (+) converts string 'id' to a number
      const id = +params["ID"]; // (+) converts string 'id' to a number
      // Now you can use id to load the stock item...
      this.getAllStockItems(id);
    });
  }

  getAllStockItems(id: number) {
    const url =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_STOCK_ITEMS_BASE_URL +
      `?stock_id=${id}`;
    this.httpShareService.get<StockItemsModel[]>(url, null).subscribe(
      (res: any) => {
        console.log(res);
        this.stockItemsModel = res;
        this.moduleStateService.setStockItemListState(res);
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

  editStockItemtModal(modal: any, stockItemObj: any) {
    this.modalService.open(modal, { scrollable: true, size: "lg" });
    // feed form
    // this._feedEditProductForm(product);
    // feed form

    this.stockItem = stockItemObj;

    this.editStockItemForm.patchValue({
      product: stockItemObj.product.id,
      description: stockItemObj.description,
      qty: stockItemObj.qty,
      qty_in: stockItemObj.qty_in,
      unit_price: stockItemObj.unit_price,
      unit_selling_price: stockItemObj.unit_selling_price,
      unit_estmated_profit: stockItemObj.unit_estmated_profit,
      status: stockItemObj.status,
      date_updated: stockItemObj.date_created,
    });
  }
  editStockItemSubmit() {
    this.submitted = true;
    this.isLoading = true;
    if (this.editStockItemForm.invalid) {
      this.isLoading = false;
      this.customAlert.successmsg(
        "Form is not valid",
        "Please fill all the required fields",
        "error"
      );
      this.isLoading = false;
      return;
    } else {
      const url =
        environment.E_SHOP_BASE_URL +
        environment.IMS.IMS_STOCK_ITEMS_BASE_URL +
        `?stock_item_id=${this.stockItem.id}`;
      this.httpShareService
        .put(url, this.editStockItemForm.value, null)
        .subscribe(
          (res: any) => {
            this.customAlert.successmsg(
              "Stock Item Updated Successfully",
              "Stock Item Updated Successfully",
              "success"
            );
            this.modalService.dismissAll();
            this.isLoading = false;
            this.getAllStockList();
          },
          (error) => {
            this.customAlert.successmsg(
              "Error in updating stock item",
              "Something went wrong, please try again later",
              "error"
            );
            this.isLoading = false;
          }
        );
    }
  }

  deleteStockItem(stockItemId: any) {
    const url =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_STOCK_ITEMS_BASE_URL +
      `?stock_item_id=${stockItemId}`;
    this.httpShareService.delete(url).subscribe(
      (res: any) => {
        this.customAlert.successmsg(
          "Stock Item Deleted Successfully",
          "Stock Item Deleted Successfully",
          "success"
        );
        this.getAllStockList();
      },
      (error) => {
        this.customAlert.successmsg(
          "Error in deleting stock item",
          "Something went wrong, please try again later",
          "error"
        );
      }
    );
  }

  _comfirmAndDeleteStockItem(stockItemId) {
    this.customAlert.comfirmAndDelete({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      comfirm: (result) => {
        console.log(result);
        if (result) {
          this.deleteStockItem(stockItemId);
        }
      },
    });
  }

  getProductsList() {
    const burl =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_PRODUCT_LIST_WITH_NO_PAGENATION;

    this.httpShareService.get<ProductModel[]>(burl, null).subscribe(
      (data) => {
        this.productsModel = data;
      },
      (error) => {
        this.error = error ? error : "";
        this.customAlert.successmsg("An error Occured", `${error}`, "warning");
      }
    );
  }

  changeTab(id, stockItemObj: any) {
    this.customNav.select(id);
    this.getStockItemSales(stockItemObj);
  }

  onTabKClick(event) {
    console.log(event);
    this.getAllStockList();
  }

  getStockItemSales(stockItemObj: any) {
    this.stockItem = stockItemObj;
    const url =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_SALES_BASE_URL +
      `?stock_item_id=${stockItemObj.id}`;
    this.repositoryService.getList(
      url,
      (data: any) => {
        // console.log(res);
        this.stockItemSales = data;
        const newsalesState = data;
        this.moduleStateService.setSalesState(newsalesState);
        // this.moduleStateService.setCurrentStockItemState(stockItemObj);
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
      `?stock_item_id=${this.stockItem.id}`;

    this.repositoryService.getSingle(
      url,
      (data: any) => {
        this.stockItem = data;
        console.log("stockItem", this.stockItem);
        console.log(data);
        this.moduleStateService.setCurrentStockItemState(data);
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
