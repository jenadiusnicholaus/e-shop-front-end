import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomAlertService } from "src/app/shared/custom-alert.service";
import { SharedService } from "src/app/shared/custom_http.service";
import { environment } from "src/environments/environment";
import { ProductsModel, Result } from "./models";
import { CategoryModel } from "../category/category.models";
import Swal from "sweetalert2";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  productModel: ProductsModel;
  categoryModel: CategoryModel[];
  productDetails: Result;
  error: "";

  // forms
  addProductForm: UntypedFormGroup;
  editProductForm: UntypedFormGroup;

  // flag

  submitted = false;

  constructor(
    public httpShareService: SharedService,
    public customAlert: CustomAlertService,
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllProduct(1);
    this._getAllCategory();

    this.addProductForm = this.formBuilder.group({
      status: ["", [Validators.required]],
      category: ["", [Validators.required]],
      name: ["", [Validators.required]],
      price: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });

    this.editProductForm = this.formBuilder.group({
      status: ["", [Validators.required]],
      category: ["", [Validators.required]],
      name: ["", [Validators.required]],
      price: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
  }

  _getAllCategory() {
    const burl =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_CAT_BASE_URL +
      environment.IMS.CATEGORY_LIST_WITH_NO_PAGENATION;

    this.httpShareService.get<CategoryModel[]>(burl, null).subscribe(
      (data) => {
        this.categoryModel = data;
      },
      (error) => {
        this.error = error ? error : "";
        // this.customAlert.successmsg("An error Occured", `${error}`, "warning");
        this.customAlert.errorToast("An error Occured", `${error}`, "error");
      }
    );
  }

  get addForm() {
    return this.addProductForm.controls;
  }

  get editForm() {
    return this.addProductForm.controls;
  }

  getAllProduct(pageNumber: any, aurl?: any) {
    let burl = "";
    if (aurl != null) {
      burl = aurl;
    } else {
      burl =
        environment.E_SHOP_BASE_URL +
        environment.IMS.IMS_PRODUCT_BASE_URL +
        `?page=${pageNumber}`;
    }

    console.log(burl);
    this.httpShareService.get<ProductsModel>(burl, null).subscribe(
      (data) => {
        console.log(data);
        this.productModel = data;
      },

      (error) => {
        console.log(error);
        this.customAlert.errorToast("An error Occured", `${error}`, "error");
      }
    );
  }

  _addProduct() {
    console.log(this.addProductForm.value);

    this.submitted = true;
    if (this.addProductForm.invalid) {
      return;
    }
    let burl =
      environment.E_SHOP_BASE_URL + environment.IMS.IMS_PRODUCT_BASE_URL;
    this.httpShareService.post(null, burl, this.addProductForm.value).subscribe(
      (data) => {
        // console.log(data);
        // this.customAlert.successmsg(
        //   "Success",
        //   "Product Added Successfully",
        //   "success"
        // );
        this.customAlert.successToast(
          "Success",
          "Product Added Successfully",
          "success"
        );
        this.getAllProduct(1);
      },
      (error) => {
        // this.customAlert.successmsg("An error Occured", `${error}`, "warning");
        this.customAlert.errorToast("An error Occured", `${error}`, "error");
      }
    );
  }

  _deleteProduct(productId: any) {
    let burl =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_PRODUCT_BASE_URL +
      `?product_id=${productId}`;
    this.httpShareService.delete(burl).subscribe(
      (data) => {
        // this.customAlert.successmsg(
        //   "Success",
        //   "Product Deleted Successfully",
        //   "success"
        // );
        this.customAlert.successToast(
          "Success",
          "Product Deleted Successfully",
          "success"
        );
        this.getAllProduct(1);
      },
      (error) => {
        // this.customAlert.successmsg("An error Occured", `${error}`, "warning");
        this.customAlert.errorToast("An error Occured", `${error}`, "error");
      }
    );
  }

  _comfirmAndDelete(ProductId: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#ff3d60",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this._deleteProduct(ProductId);
      }
    });
  }

  addProductModal(modal: any) {
    this.modalService.open(modal, { scrollable: true, size: "lg" });
  }

  editProductModal(modal: any, product: any) {
    this.modalService.open(modal, { scrollable: true, size: "lg" });
    // feed form
    this._feedEditProductForm(product);
  }

  _feedEditProductForm(product: any) {
    this.productDetails = product;
    this.editProductForm.patchValue({
      status: product.status,
      category: product.category,
      name: product.name,
      description: product.description,
      price: product.price,
    });
  }

  _editProduct() {
    console.log(this.editProductForm.value);
    let burl =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_PRODUCT_BASE_URL +
      `?product_id=${this.productDetails.id}`;
    this.httpShareService.put(burl, this.editProductForm.value, null).subscribe(
      (data) => {
        // this.customAlert.successmsg(
        //   "Success",
        //   "Product Edited Successfully",
        //   "success"
        // );
        this.customAlert.successToast(
          "Success",
          "Product Edited Successfully",
          "success"
        );
        this.getAllProduct(1);
      },
      (error) => {
        // this.customAlert.successmsg("An error Occured", `${error}`, "warning");
        this.customAlert.errorToast("An error Occured", `${error}`, "error");
      }
    );
  }
}
