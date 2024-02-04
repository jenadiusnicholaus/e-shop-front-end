import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { UiModule } from "../shared/ui/ui.module";
import { WidgetModule } from "../shared/widget/widget.module";

import { PagesRoutingModule } from "./pages-routing.module";

import {
  NgbNavModule,
  NgbDropdownModule,
  NgbTooltipModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
  NgbCollapseModule,
  NgbModalModule,
} from "@ng-bootstrap/ng-bootstrap";
import { NgApexchartsModule } from "ng-apexcharts";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { FullCalendarModule } from "@fullcalendar/angular";
import { DndModule } from "ngx-drag-drop";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";

import { DashboardComponent } from "./dashboard/dashboard.component";

import { CategoryComponent } from "./category/category.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { ProductsComponent } from "./products/products.component";
import { StockComponent } from "./stock/stock.component";
import { StockItemsComponent } from "./stock-items/stock-items.component";
import { AddNewStockItemComponent } from "./add-new-stock-item/add-new-stock-item.component";
import { SalesComponent } from "./sales/sales.component";
import { ModuleStateService } from "./moduleshared.service";
import { UnderconstractionPageComponent } from "./underconstraction-page/underconstraction-page.component";
import { RepositoryService } from "./repository.service";
import { StockSalesComponent } from "./stock-sales/stock-sales.component";
// import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
// import { ToastModule } from "primeng/toast";
// import { MessageService } from "primeng/api/messageservice";
// import { MessageService } from "primeng/api";
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 0.3,
};

@NgModule({
  declarations: [
    DashboardComponent,
    CategoryComponent,
    ProductsComponent,
    StockComponent,
    StockItemsComponent,
    AddNewStockItemComponent,
    SalesComponent,
    UnderconstractionPageComponent,
    StockSalesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    UiModule,

    Ng2SearchPipeModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    DndModule,
    FullCalendarModule,

    LeafletModule,
    WidgetModule,
    NgbPaginationModule,
    //  DataTablesModule,
    // 
    NgbTypeaheadModule,
    // BrowserAnimationsModule,
    // ToastModule,

    NgbCollapseModule,
    NgSelectModule,
    NgxSliderModule,
    NgbModalModule,
  ],
  providers: [
    ModuleStateService,
    RepositoryService,
    // BrowserModule,

    // MessageService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class PagesModule {}
