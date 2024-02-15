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
import * as XLSX from "xlsx";

@Component({
  selector: "app-stock-sales",
  templateUrl: "./stock-sales.component.html",
  styleUrls: ["./stock-sales.component.scss"],
})
export class StockSalesComponent implements OnInit {
  stockItemsSalesModel: StockSalesModel[];
  currentstockItemsaleOBj;
  StockSalesModel;
  curentStock: any;
  searchValue: string;
  fileName = ``;
  viewDetailsClicked: boolean = false;

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

    this.moduleStateService.currentStock$.subscribe((state) => {
      if (state !== null) {
        this.curentStock = state;
      }
    });

    this.fileName = `StockSales_${
      this.curentStock.name
    }.xlsx_${new Date()}.xlsx`;
    this.viewDetailsClicked = false;
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById("excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
  goToDetails(currentOBj) {
    this.currentstockItemsaleOBj = currentOBj;
    this.viewDetailsClicked = true;
  }
}
