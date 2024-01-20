import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";

import { CategoryComponent } from "./category/category.component";
import { ProductsComponent } from "./products/products.component";
import { StockComponent } from "./stock/stock.component";
import { StockItemsComponent } from "./stock-items/stock-items.component";

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "category", component: CategoryComponent },
  { path: "products", component: ProductsComponent },
  { path: "stock", component: StockComponent },
  { path: "stock-items/:ID", component: StockItemsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
