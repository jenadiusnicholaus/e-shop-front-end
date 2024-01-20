import { Component, OnInit } from "@angular/core";
import { StockModel } from "./models";
import { UntypedFormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomAlertService } from "src/app/shared/custom-alert.service";
import { SharedService } from "src/app/shared/custom_http.service";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.scss"],
})
export class StockComponent implements OnInit {
  stockModel: StockModel[];
  stockLodding: boolean = false;
  ngOnInit(): void {
    this.getAllStock();
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
        this.customAlert.successmsg(
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
}
