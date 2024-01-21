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
import { ModuleStateService } from "./shared_service";
import { UnderconstractionPageComponent } from './underconstraction-page/underconstraction-page.component';
// import { DataTablesModule } from 'angular-datatables';

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

    NgbCollapseModule,
    NgSelectModule,
    NgxSliderModule,
    NgbModalModule,
  ],
  providers: [
    ModuleStateService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class PagesModule {}
