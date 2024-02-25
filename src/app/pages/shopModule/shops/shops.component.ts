import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomAlertService } from "src/app/shared/custom-alert.service";
import { SharedService } from "src/app/shared/custom_http.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-shops",
  templateUrl: "./shops.component.html",
  styleUrls: ["./shops.component.scss"],
})
export class ShopsComponent implements OnInit {
  constructor(
    public httpShareService: SharedService,
    public customAlert: CustomAlertService,
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private router: Router
  ) {}

  stockLodding: boolean = false;
  shops: any;

  ngOnInit(): void {
    this.getAllShop();
  }

  getAllShop() {
    this.stockLodding = true;
    const url = environment.E_SHOP_BASE_URL + environment.IMS.IMS_SHOP;
    this.httpShareService.get(url, null).subscribe(
      (res: any) => {
        this.stockLodding = false;
        this.shops = res;
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
}
