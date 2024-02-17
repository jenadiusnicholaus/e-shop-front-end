import { Component, Input, OnInit } from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";
import { ProductsModel, Result } from "../../productModule/products/models";
import { ProductModel } from "./models";
import { environment } from "src/environments/environment";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomAlertService } from "src/app/shared/custom-alert.service";
import { SharedService } from "src/app/shared/custom_http.service";

@Component({
  selector: "app-add-new-stock-item",
  templateUrl: "./add-new-stock-item.component.html",
  styleUrls: ["./add-new-stock-item.component.scss"],
})
export class AddNewStockItemComponent implements OnInit {
  productsModel: ProductModel[];
  @Input() stockId: number;
  currentTheme: string;

  STATUS = [
    // ("1", "in-stock"), ("2", "out-stock")),
    { id: "1", name: "in-stock" },
    { id: "2", name: "out-stock" },
  ];

  SI_UNIT_CHOICES = [
    { id: "m", name: "Meter (m)" },
    { id: "kg", name: "Kilogram (kg)" },
    { id: "g", name: "Gram (g)" },
    { id: "just_no", name: "just_no" },
    { id: "pic", name: "Pic" },
    { id: "box", name: "Box" },
    { id: "carton", name: "Carton" },
    { id: "dozen", name: "Dozen" },
    { id: "pack", name: "Pack" },
    { id: "set", name: "Set" },
    { id: "unit", name: "Unit" },
    { id: "other", name: "Other" },
  ];

  error: "";

  addNewStockItemForm: UntypedFormGroup; // bootstrap validation form

  constructor(
    public formBuilder: UntypedFormBuilder,
    public httpShareService: SharedService,
    public customAlert: CustomAlertService,
    private modalService: NgbModal
  ) {}
  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Form submition
  submit: boolean;

  //   {
  //     "product":15,
  //     "stock": 3,
  //     "description": "dddkkak",
  //     "qty": 3.0,
  //     "qty_in": "pic",
  //     "unit_price": "600",
  //     "unit_selling_price": "700",
  //     "unit_estmated_profit": "100.0",
  //     "status": "1",
  //     "date_created": "2024-01-13T14:22:08Z"

  // }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Forms" },
      { label: "Form Validation", active: true },
    ];

    this.addNewStockItemForm = this.formBuilder.group({
      product: ["", [Validators.required]],
      description: ["", [Validators.required]],
      qty: ["", [Validators.required]],
      qty_in: ["", [Validators.required]],
      unit_price: ["", [Validators.required]],
      unit_estmated_profit: ["", [Validators.required]],
      unit_selling_price: ["", [Validators.required]],
      status: ["", [Validators.required]],
      date_created: ["", [Validators.required]],
    });

    this.submit = false;
    this.currentTheme = localStorage.getItem("theme");
    console.log(this.currentTheme);

    this.getProductsList();
  }

  get addStockItemform() {
    return this.addNewStockItemForm.controls;
  }

  addStockItemSubmit() {
    this.submit = true;
    if (this.addNewStockItemForm.invalid) {
      return;
    }
    const body = {
      product: this.addNewStockItemForm.value.product,
      stock: this.stockId,
      description: this.addNewStockItemForm.value.description,
      qty: this.addNewStockItemForm.value.qty,
      qty_in: this.addNewStockItemForm.value.qty_in,
      unit_price: this.addNewStockItemForm.value.unit_price,
      unit_selling_price: this.addNewStockItemForm.value.unit_selling_price,
      unit_estmated_profit: this.addNewStockItemForm.value.unit_estmated_profit,
      status: this.addNewStockItemForm.value.status,
      date_created: this.addNewStockItemForm.value.date_created,
    };
    const url =
      environment.E_SHOP_BASE_URL + environment.IMS.IMS_STOCK_ITEMS_BASE_URL;
    console.log(this.addNewStockItemForm.value);
    console.log(url);

    this.httpShareService.post(null, url, body).subscribe(
      (data) => {
        this.customAlert.successToast("Stock Item Added", "Stock Item Added");
      },
      (error) => {
        this.error = error ? error : "";
        // this.customAlert.successmsg("An error Occured", `${error}`, "warning");
        this.customAlert.errorToast("An error Occured", `${error}`, "error");
      }
    );
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
        // this.customAlert.successmsg("An error Occured", `${error}`, "warning");
        this.customAlert.errorToast("An error Occured", `${error}`, "error");
      }
    );
  }
}
