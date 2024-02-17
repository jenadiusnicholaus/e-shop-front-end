import { Component, OnInit } from "@angular/core";
import { StockModel } from "./models";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomAlertService } from "src/app/shared/custom-alert.service";
import { SharedService } from "src/app/shared/custom_http.service";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.scss"],
})
export class StockComponent implements OnInit {
  stockModel: StockModel[];
  stockLodding: boolean = false;
  addStockForm: UntypedFormGroup;
  submitted: boolean;
  fileInput: any;
  searchTerm: string;

  errors = {
    name: [],
    status: [],
    password: [],
    date_created: [],
    image: [],
  };

  ngOnInit(): void {
    this.getAllStock();
    this.addStockForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      status: ["", [Validators.required]],
      date_created: ["", [Validators.required]],
      image: ["", [Validators.required]],
    });
  }

  get form() {
    return this.addStockForm.controls;
  }

  constructor(
    public httpShareService: SharedService,
    public customAlert: CustomAlertService,
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private router: Router
  ) {}

  getAllStock() {
    this.stockLodding = true;
    const url =
      environment.E_SHOP_BASE_URL + environment.IMS.IMS_STOCK_BASE_URL;
    this.httpShareService.get(url, null).subscribe(
      (res: any) => {
        this.stockLodding = false;
        this.stockModel = res;
      },

      (error) => {
        this.stockLodding = false;
        this.customAlert.errorToast(
          "Error in fetching stock details",
          "Something went wrong, please try again later",
          "error"
        );
      }
    );
  }

  gotoStockItems(stockId: number) {
    this.router.navigate(["/stock-items", stockId]);
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.fileInput = event.target.files[0];
    }
  }

  saveData() {
    let formdata = new FormData();
    formdata.append("name", this.addStockForm.value.name);
    formdata.append("status", this.addStockForm.value.status);
    formdata.append("date_created", this.addStockForm.value.date_created);

    // image validation
    // size
    if (this.fileInput.size > 1000000) {
      this.customAlert.errorToast(
        "Image size too large",
        "Image size should be less than 1MB",
        "error"
      );
      return;
    }

    // type
    if (
      this.fileInput.type !== "image/jpeg" &&
      this.fileInput.type !== "image/png"
    ) {
      this.customAlert.errorToast(
        "Invalid image type",
        "Image type should be jpg or png",
        "error"
      );
      return;
    }

    // append image

    if (this.fileInput) {
      formdata.append("image", this.fileInput, this.fileInput.name);
    }

    const url =
      environment.E_SHOP_BASE_URL + environment.IMS.IMS_STOCK_BASE_URL;

    this.httpShareService.post(null, url, formdata).subscribe(
      (result) => {
        console.log(result);
        this.customAlert.successToast(
          "Success",
          "Stock created successfully",
          "success"
        );
        this.getAllStock();
        this.modalService.dismissAll();
        //clear the form
        this.addStockForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        this.handleErrorResponse(error);
        this.customAlert.errorToast(
          "Error in creating stock",
          "Error in creating stock",
          "error"
        );
      }
    );
  }

  handleErrorResponse(errorResponse) {
    for (let field in errorResponse) {
      console.log(field);
      if (this.errors.hasOwnProperty(field)) {
        this.errors[field] = errorResponse[field];
      }
    }
  }
}
