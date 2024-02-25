import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";

import { CategoryComponent } from "./productModule/category/category.component";
import { ProductsComponent } from "./productModule/products/products.component";
import { StockComponent } from "./stockModule/stock/stock.component";
import { StockItemsComponent } from "./stockModule/stock-items/stock-items.component";
import { SalesComponent } from "./salesModule/sales/sales.component";
import { ExpensesComponent } from "./expensesModule/expenses/expenses.component";
import { ProductDetailsComponent } from "./productModule/product-details/product-details.component";
import { ShopsComponent } from "./shopModule/shops/shops.component";

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "category", component: CategoryComponent },
  { path: "products", component: ProductsComponent },
  { path: "stock", component: StockComponent },
  { path: "stock-items/:ID", component: StockItemsComponent },
  { path: "expenses", component: ExpensesComponent },
  { path: "product-details/:ID", component: ProductDetailsComponent },
  { path: "shops", component: ShopsComponent },

  {
    path: "sales",
    component: SalesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
