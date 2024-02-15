import { Component, Input, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { RepositoryService } from "../repository.service";
import { data } from "jquery";

@Component({
  selector: "app-sales-history",
  templateUrl: "./sales-history.component.html",
  styleUrls: ["./sales-history.component.scss"],
})
export class SalesHistoryComponent implements OnInit {
  chatData;
  chatMessagesData;
  @Input() salesModel = <any>[];
  @Input() currentSales;
  searchValue: string;

  SalesHistrory;

  constructor(private repositoryService: RepositoryService) {}

  ngOnInit(): void {
    this.getSalesHistory(this.currentSales);
  }

  getSalesHistory(sales) {
    console.log(sales);

    const url =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_SALES_HISTORY_URL +
      `?stock_item_id=${sales.stock_item.id}`;

    this.repositoryService.getList(
      url,
      (data) => {
        this.SalesHistrory = data;
        this.currentSales = sales;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
