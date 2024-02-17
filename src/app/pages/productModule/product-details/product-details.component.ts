import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { RepositoryService } from "../../repository.service";
import { en } from "@fullcalendar/core/internal-common";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
})
export class ProductDetailsComponent implements OnInit {
  productID: any;
  productDetail: any;
  breadCrumbItems: Array<{}>;
  media_url = environment.E_SHOP_MEDIA_BASE_URL;

  constructor(
    private route: ActivatedRoute,
    private repositoryService: RepositoryService
  ) {}
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Product" },
      { label: "Product Detail", active: true },
    ];

    this.getProductDetails();
  }

  getProductDetails() {
    this.route.params.subscribe((params) => {
      this.productID = +params["ID"];

      const url =
        environment.E_SHOP_BASE_URL +
        environment.IMS.IMS_PRODUCT_DETAILS +
        `?product_id=${params["ID"]}`;

      this.repositoryService.getSingle(
        url,
        (data) => {
          this.productDetail = data;
        },
        (eero) => {}
      );
    });
  }
}
