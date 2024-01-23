import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomAlertService } from "src/app/shared/custom-alert.service";
import { SharedService } from "src/app/shared/custom_http.service";
import { ModuleStateService } from "../moduleshared.service";
import { RepositoryService } from "../repository.service";
import { environment } from "src/environments/environment";
import { StockSalesModel } from "./model";

@Component({
  selector: "app-stock-sales",
  templateUrl: "./stock-sales.component.html",
  styleUrls: ["./stock-sales.component.scss"],
})
export class StockSalesComponent implements OnInit {
  stockItemsSalesModel: StockSalesModel[];
  curentStockItem: any;
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
    this.moduleStateService.stockSalesList$.subscribe((state) => {
      if (state !== null) {
        this.stockItemsSalesModel = state;
      }
    });
  }
}
