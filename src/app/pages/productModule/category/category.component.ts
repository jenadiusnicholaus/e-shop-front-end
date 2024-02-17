import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";

import { DecimalPipe } from "@angular/common";
import { environment } from "src/environments/environment";
import { SharedService } from "src/app/shared/custom_http.service";
import { CategoryDetails, CategoryModel } from "./category.models";
import { CustomAlertService } from "src/app/shared/custom-alert.service";
import DataTables from "datatables.net";
import Swal from "sweetalert2";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  // breadcrumb items
  breadCrumbItems: Array<{}>;
  editCategoryForm: UntypedFormGroup;
  addCategoryForm: UntypedFormGroup;
  submitted = false;

  categoryModel: CategoryModel;
  categoryDetails: CategoryDetails;
  error: "";

  constructor(
    // public service: OrderService,
    public httpShareService: SharedService,
    public customAlert: CustomAlertService,
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "IMS" },
      { label: "Categories", active: true },
    ];
    this.editCategoryForm = this.formBuilder.group({
      status: ["", [Validators.required]],
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });

    this.addCategoryForm = this.formBuilder.group({
      status: ["", [Validators.required]],
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
    this._getAllCategory(1);
  }

  get editForm() {
    return this.editCategoryForm.controls;
  }

  _getAllCategory(pageNumber: any, aurl?: any) {
    let burl = "";
    if (aurl != null) {
      burl = aurl;
    } else {
      burl =
        environment.E_SHOP_BASE_URL +
        environment.IMS.IMS_CAT_BASE_URL +
        environment.IMS.CATEGORY_SUB_BASE_URL +
        `?page=${pageNumber}`;
    }
    this.httpShareService.get<CategoryModel>(burl, null).subscribe(
      (data) => {
        this.categoryModel = data;
      },
      (error) => {
        this.error = error ? error : "";
        this.customAlert.errorToast("An error Occured", `${error}`, "warning");
      }
    );
  }

  _comfirmAndDeleteCategory(categoryId) {
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
        this._deleteCategory(categoryId);
      }
    });
  }

  _deleteCategory(categoryId) {
    let url =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_CAT_BASE_URL +
      environment.IMS.CATEGORY_SUB_BASE_URL +
      `?category_id=${categoryId}`;
    this.httpShareService.delete<CategoryModel>(url).subscribe(
      (data) => {
        this._getAllCategory(1);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      },
      (error) => {
        this.error = error ? error : "";
        // this.customAlert.successmsg("An error Occured", `${error}`, "warning");
        this.customAlert.errorToast("An error Occured", `${error}`);
      }
    );
  }

  _editCategory(categoryId) {
    if (this.editCategoryForm.invalid) {
      // Swal.fire("Warning!", "Form is invalid.", "warning");
      this.customAlert.warningToast("Warning!", "Form is invalid.", "warning");

      return false;
    }
    let url =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_CAT_BASE_URL +
      environment.IMS.CATEGORY_SUB_BASE_URL +
      `?category_id=${categoryId}`;
    this.httpShareService
      .put<CategoryModel>(url, this.editCategoryForm.value, null)
      .subscribe(
        (data) => {
          this._getAllCategory(1);
          // Swal.fire("Edited!", "Your file has been Edited.", "success");
          this.customAlert.successToast(
            "Edited!",
            "Your file has been Edited.",
            "success"
          );
        },
        (error) => {
          this.error = error ? error : "";
          // this.customAlert.successmsg(
          //   "An error Occured",
          //   `${error}`,
          //   "warning"
          // );
          this.customAlert.errorToast("An error Occured", `${error}`);
        }
      );
  }

  _addCategory() {
    if (this.addCategoryForm.invalid) {
      return false;
    }
    let url =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_CAT_BASE_URL +
      environment.IMS.CATEGORY_SUB_BASE_URL;

    this.httpShareService
      .post<CategoryModel>(null, url, this.addCategoryForm.value)
      .subscribe(
        (data) => {
          this._getAllCategory(1);
          // Swal.fire("Added!", "Your file has been Added.", "success");
          this.customAlert.successToast(
            "Added!",
            "Your file has been Added.",
            "success"
          );
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          // this.error = error ? error : "";
          // this.customAlert.successmsg(
          //   "An error Occured",
          //   `${error}`,
          //   "warning"
          // );
          console.log(error);
          this.customAlert.errorToast(
            "An error Occured",
            `${
              Array.isArray(error.name) && typeof error.name[0] === "string"
                ? error.name[0]
                : " An Error occured"
            }`,
            "error"
          );
        }
      );
  }

  _getCategoryInfos(categoryId) {
    let url =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_CAT_BASE_URL +
      environment.IMS.CATEGORY_SUB_BASE_URL +
      `?category_id=${categoryId}`;
    this.httpShareService.get<CategoryDetails>(url, null).subscribe(
      (data) => {
        this.categoryDetails = data;

        this.editCategoryForm.get("name").setValue(data?.data?.name);
        this.editCategoryForm
          .get("description")
          .setValue(data?.data?.description);
        this.editCategoryForm.get("status").setValue(data?.data?.status);
      },
      (error) => {
        this.error = error ? error : "";
        // this.customAlert.successmsg("An error Occured", `${error}`, "warning");
        this.customAlert.errorToast("An error Occured", `${error}`);
      }
    );
  }

  _editCategoryModal(scrollDataModal: any, categoryId) {
    this._getCategoryInfos(categoryId);
    this.modalService.open(scrollDataModal, { scrollable: true });
  }

  _addCategoryModal(scrollDataModal: any) {
    // this._getCategoryInfos(categoryId)
    this.modalService.open(scrollDataModal, { scrollable: true });
  }
}
