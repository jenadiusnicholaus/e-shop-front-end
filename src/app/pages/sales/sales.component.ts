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
import { StockItemSales } from "../stock-items/model";

@Component({
  selector: "app-sales",
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.scss"],
})
export class SalesComponent implements OnInit {
  submitted = false;
  StockItemModel: any;
  priceChanged = false;
  @Input() stockItemSales: StockItemSales;
  constructor(
    public httpShareService: SharedService,
    public customAlert: CustomAlertService,
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}
  createSalesForm: UntypedFormGroup;
  ngOnInit(): void {
    this.createSalesForm = this.formBuilder.group({
      stock_item: ["", [Validators.required]],
      quantity_sold: ["", [Validators.required]],
      price: ["", [Validators.required]],
      product_price_changed: [false, [Validators.required]],
      reason_for_change: ["", [Validators.required]],
      sales_date: ["", [Validators.required]],
    });
    this.submitted = false;
    this.createSalesForm.get("reason_for_change").disable();
  }

  get salesForm() {
    return this.createSalesForm.controls;
  }

  createSalesFormSubmit() {
    this.submitted = true;
  }

  onCheckboxChange($event) {
    this.priceChanged = $event.target.checked;
    if (this.priceChanged) {
      this.createSalesForm.get("reason_for_change").enable();
    } else {
      this.createSalesForm.get("reason_for_change").disable();
    }
  }
}
