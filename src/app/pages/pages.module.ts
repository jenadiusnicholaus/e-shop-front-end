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
  NgbDatepickerModule,
  NgbProgressbarModule,
} from "@ng-bootstrap/ng-bootstrap";
// import { BarRatingModule } from "ngx-bar-rating";
import { NgApexchartsModule } from "ng-apexcharts";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { FullCalendarModule } from "@fullcalendar/angular";
import { DndModule } from "ngx-drag-drop";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";

import { DashboardComponent } from "./dashboard/dashboard.component";

import { CategoryComponent } from "./productModule/category/category.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { ProductsComponent } from "./productModule/products/products.component";
import { StockComponent } from "./stockModule/stock/stock.component";
import { StockItemsComponent } from "./stockModule/stock-items/stock-items.component";
import { AddNewStockItemComponent } from "./stockModule/add-new-stock-item/add-new-stock-item.component";
import { SalesComponent } from "./salesModule/sales/sales.component";
import { ModuleStateService } from "./moduleshared.service";
import { UnderconstractionPageComponent } from "./underconstraction-page/underconstraction-page.component";
import { RepositoryService } from "./repository.service";
import { StockSalesComponent } from "./stockModule/stock-sales/stock-sales.component";
// import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { SharedLoaderComponent } from "./shared-loader/shared-loader.component";
import { StockOrdersComponent } from "./stockModule/stock-orders/stock-orders.component";
import { ExpensesComponent } from "./expensesModule/expenses/expenses.component";
import { SalesHistoryComponent } from "./salesModule/sales-history/sales-history.component";
import { ProductDetailsComponent } from "./productModule/product-details/product-details.component";
import { ColorPickerModule } from "ngx-color-picker";
import { provideNgxMask } from "ngx-mask";
import { NgxDropzoneModule } from "ngx-dropzone";
// import { StarRatingModule } from "angular-star-rating";
import { DropzoneModule } from "ngx-dropzone-wrapper";

import { DROPZONE_CONFIG } from "ngx-dropzone-wrapper";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";
import { NgbRatingModule } from "@ng-bootstrap/ng-bootstrap";
import { ShopsComponent } from './shopModule/shops/shops.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: "https://httpbin.org/post",
  maxFilesize: 4,
};

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
    SharedLoaderComponent,
    StockOrdersComponent,
    ExpensesComponent,
    SalesHistoryComponent,
    ProductDetailsComponent,
    ShopsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    UiModule,
    NgbDatepickerModule,

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
    ColorPickerModule,
    DropzoneModule,
    NgxDropzoneModule,

    //  DataTablesModule,
    //
    NgbTypeaheadModule,
    // BrowserAnimationsModule,
    // ToastModule,
    TranslateModule,

    NgbRatingModule,
    NgbCollapseModule,
    NgSelectModule,
    NgxSliderModule,
    NgbModalModule,
    // NgImageZoomModule,
    NgbProgressbarModule,
    // BarRatingModule,
    // StarRatingModule.forRoot(),
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

    provideNgxMask(),
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
  ],
})
export class PagesModule {}
