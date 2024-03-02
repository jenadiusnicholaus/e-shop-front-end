import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  UntypedFormBuilder,
  Validators,
  UntypedFormGroup,
} from "@angular/forms";
import { latLng, tileLayer } from "leaflet";

import { ChartType, Stat, Chat, Transaction } from "./dashboard.model";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";

import {
  statData,
  revenueChart,
  salesAnalytics,
  sparklineEarning,
  // sparklySales,
  chatData,
  transactions,
} from "./data";
import { en } from "@fullcalendar/core/internal-common";
import { environment } from "src/environments/environment";
import { RepositoryService } from "../repository.service";
import { NgbDate, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as XLSX from "xlsx";
import { get } from "jquery";
import { CustomAlertService } from "src/app/shared/custom-alert.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})

/**
 * Dashboard Component
 */
export class DashboardComponent implements OnInit {
  term: any;
  chatData: Chat[];
  transactions: Transaction[];
  statData: Stat[];
  SalesData: any;
  NumberofSales: number = 0;
  SalesRevenue: number = 0;
  currentYearRevenueData: any;
  previousYearRevenueData: any;
  currentMonthRevenue: any;
  currentYearRevenue: any;
  previusYearRevenue: any;
  currentMonthRevenuePercentage: any;
  previousYearRevenue: any;
  todayRevenue: any;
  weeklyEarningData: any;
  weeklysalesData: any;
  total_weekly_revenue: any;
  total_weekly_sales: any;
  totalExpenses: any = 0;
  stockModel: any;

  isLoadingDashboard = false;

  threeMonthSalesPercentage: any;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  underconstraction = false;
  limt = 5;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private repositoryService: RepositoryService,
    private customAlert: CustomAlertService
  ) {}

  // bread crumb items
  breadCrumbItems: Array<{}>;

  revenueChart: ChartType;
  salesAnalytics: ChartType;
  sparklineEarning: ChartType;
  sparklySales: ChartType;

  // Form submit
  chatSubmit: boolean;

  formData: UntypedFormGroup;

  ngOnInit(): void {
    this.isLoadingDashboard = true;
    this.getSales();

    this.getallExpense();
    this.getallStock();

    this.breadCrumbItems = [
      { label: "E-shop" },
      { label: "Dashboard", active: true },
    ];
    this.formData = this.formBuilder.group({
      message: ["", [Validators.required]],
    });

    this.underconstraction = false;

    // totalSalesPercentage2023 = this.getTotalRevenueByYear(this.salesData, 2023);
  }

  viewall() {
    this.limt = this.SalesData.length;
  }

  getrevenueChart() {
    const rdata: ChartType = {
      series: [
        {
          // get the previous year sales data
          name: `${new Date().getFullYear() - 1}`,
          type: "column",
          data: this.previousYearRevenueData,
        },
        {
          name: `${new Date().getFullYear()}`,
          type: "line",
          data: this.currentYearRevenueData,
        },
      ],
      chart: {
        height: 280,
        type: "line",
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [0, 3],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "20%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      colors: ["#5664d2", "#1cbb8c"],
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    };

    return rdata;
  }

  private _fetchData() {
    this.revenueChart = this.getrevenueChart();
    this.salesAnalytics = this.getSalesAnalytics();
    this.sparklineEarning = this.getWeeklyEarning();
    this.sparklySales = this.getsparklySales();
    this.chatData = chatData;
    this.transactions = transactions;
    this.statData = this.getStatData();
  }

  getTotalRevenueByYear(salesData: any) {
    // Get the current year and the previous year
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

    // Calculate the total sales for each month of the current year and the previous year
    const totalRevenuePercentageCurrentYear =
      this.calculateTotalRevenuePercentage(salesData, currentYear);
    const totalRevenuePercentagePreviousYear =
      this.calculateTotalRevenuePercentage(salesData, previousYear);

    this.currentYearRevenueData = totalRevenuePercentageCurrentYear;
    this.previousYearRevenueData = totalRevenuePercentagePreviousYear;
    return {
      currentYear: totalRevenuePercentageCurrentYear,
      previousYear: totalRevenuePercentagePreviousYear,
    };
  }
  getTodayRevenue(data: any[]) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter the data for records where the sales_date is today
    const todayData = data.filter((record) => {
      const salesDate = new Date(record.sales_date);
      salesDate.setHours(0, 0, 0, 0);
      return salesDate.getTime() === today.getTime();
    });

    // Sum the total_revenue of these records
    const totalRevenue = todayData.reduce(
      (total, record) => total + record.total_revenue,
      0
    );

    return totalRevenue;
  }

  getCurrentMonthRevenue(data: any[]) {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Filter the data for records where the sales_date is within the current month
    const currentMonthData = data.filter((record) => {
      const salesDate = new Date(record.sales_date);
      return (
        salesDate.getMonth() === currentMonth &&
        salesDate.getFullYear() === currentYear
      );
    });

    // Sum the total_revenue of these records
    const totalRevenue = currentMonthData.reduce(
      (total, record) => total + record.total_revenue,
      0
    );

    this.currentMonthRevenue = totalRevenue;

    return totalRevenue;
  }

  getCurrentMonthRevenuePercentage(data: any[]) {
    const currentMonthRevenue = this.getCurrentMonthRevenue(data);
    const currentYearRevenue = this.getCurrentYearRevenue(data);

    // Calculate the current month's revenue as a percentage of the total revenue for the year
    let currentMonthRevenuePercentage =
      (currentMonthRevenue / currentYearRevenue) * 100;

    // Round the percentage to one decimal place
    currentMonthRevenuePercentage = parseFloat(
      currentMonthRevenuePercentage.toFixed(1)
    );

    return currentMonthRevenuePercentage;
  }

  getCurrentYearRevenue(data: any[]) {
    const currentYear = new Date().getFullYear();

    // Filter the data for records where the sales_date is within the current year
    const currentYearData = data.filter((record) => {
      const salesDate = new Date(record.sales_date);
      return salesDate.getFullYear() === currentYear;
    });

    // Sum the total_revenue of these records
    const totalRevenue = currentYearData.reduce(
      (total, record) => total + record.total_revenue,
      0
    );

    return totalRevenue;
  }

  getPreviousYearRevenue(data: any[]) {
    const previousYear = new Date().getFullYear() - 1;

    // Filter the data for records where the sales_date is within the previous year
    const previousYearData = data.filter((record) => {
      const salesDate = new Date(record.sales_date);
      return salesDate.getFullYear() === previousYear;
    });

    // Sum the total_revenue of these records
    const totalRevenue = previousYearData.reduce(
      (total, record) => total + record.total_revenue,
      0
    );

    return totalRevenue;
  }

  calculateTotalRevenuePercentage(salesData, year) {
    // Filter the sales data for the specified year
    const revenueDataForYear = salesData.filter(
      (record) => new Date(record.sales_date).getFullYear() === year
    );
    console.log("revenueDataForYear");
    console.log(revenueDataForYear);

    // Initialize an array to hold the total sales for each month
    const totalRevenueForYear = Array(12).fill(0);

    // Calculate the total sales for each month
    revenueDataForYear.forEach((record) => {
      const month = new Date(record.sales_date).getMonth(); // getMonth() returns a zero-based month index
      totalRevenueForYear[month] += record.total_revenue;
    });

    // Calculate the total sales for the year
    const totalRevenue = totalRevenueForYear.reduce((a, b) => a + b, 0);

    console.log(totalRevenue);

    // If totalRevenue is 0, return an array of zeros. Otherwise, calculate the total revenie for each month as a percentage of the total sales for the year
    const totalRevenuePercentageForYear =
      totalRevenue === 0
        ? Array(12).fill(0)
        : totalRevenueForYear.map((revenue) =>
            Math.floor((revenue / totalRevenue) * 100)
          );

    // Return the total sales for each month of the specified year as a percentage of the total sales for the year
    return totalRevenuePercentageForYear;
  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  getStatData() {
    const statData = [
      {
        icon: "ri-stack-line",
        title: "Number of Sales",
        value: this.NumberofSales,
      },
      {
        icon: "ri-store-2-line",
        title: "Sales Revenue",
        value: `TSH ${new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(this.SalesRevenue)}`,
      },
      {
        icon: "ri-briefcase-4-line",
        title: "Total Expenses",
        value:
          "TSH " + new Intl.NumberFormat("en-US").format(this.totalExpenses),
      },
    ];

    return statData;
  }
  // ================= sales analytics ================
  getSalesAnalytics() {
    const salesAnalytics: ChartType = {
      series: this.threeMonthSalesPercentage,
      chart: {
        height: 250,
        type: "donut",
      },

      plotOptions: {
        pie: {
          donut: {
            size: "75%",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      colors: ["#5664d2", "#1cbb8c", "#eeb902"],
    };

    return salesAnalytics;
  }

  getThreeMonthSalesPercentage(data: any[]) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    // Calculate the total sales for the current year
    const currentYearData = data.filter((record) => {
      const salesDate = new Date(record.sales_date);
      return salesDate.getFullYear() === currentYear;
    });
    const totalSales = currentYearData.reduce(
      (total, record) => total + record.total_sales,
      0
    );

    // Create an array for the months from January to the current month
    const months = Array.from({ length: currentMonth + 1 }, (_, i) => i);

    // Calculate the sales for each month from January to the current month
    let salesPercentage = [];
    months.forEach((month) => {
      const monthData = data.filter((record) => {
        const salesDate = new Date(record.sales_date);
        return (
          salesDate.getFullYear() === currentYear &&
          salesDate.getMonth() === month
        );
      });
      const monthSales = monthData.reduce(
        (total, record) => total + record.total_sales,
        0
      );

      // Calculate the percentage of each month's sales relative to the total sales for the year
      let monthSalesPercentage = 0;
      if (totalSales !== 0) {
        monthSalesPercentage = (monthSales / totalSales) * 100;
      }
      salesPercentage.push(parseFloat(monthSalesPercentage.toFixed(1)));
    });

    return salesPercentage;
  }

  // weekly  eanings
  getWeeklyEarning() {
    const sparklineEarning: ChartType = {
      series: this.weeklyEarningData,
      chart: {
        type: "radialBar",
        wight: 60,
        height: 60,
        sparkline: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#5664d2"],
      stroke: {
        lineCap: "round",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
          },
          track: {
            margin: 0,
          },

          dataLabels: {
            show: false,
          },
        },
      },
    };

    return sparklineEarning;
  }

  getsparklySales() {
    const weeklysales: ChartType = {
      series: this.weeklysalesData,
      chart: {
        type: "radialBar",
        wight: 60,
        height: 60,
        sparkline: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#1cbb8c"],
      stroke: {
        lineCap: "round",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
          },
          track: {
            margin: 0,
          },

          dataLabels: {
            show: false,
          },
        },
      },
    };
    return weeklysales;
  }

  calculateWeeklyEarnings(salesData, key) {
    // Get the current date
    const currentDate = new Date();

    // Calculate the start and end dates of the current week
    const startOfWeek = currentDate.getDate() - currentDate.getDay();
    const endOfWeek = startOfWeek + 6;
    const startDate = new Date();
    startDate.setDate(startOfWeek);
    startDate.setHours(0, 0, 0, 0); // Start of the day
    const endDate = new Date();
    endDate.setDate(endOfWeek);
    endDate.setHours(23, 59, 59, 999); // End of the day

    // Filter the sales data for the current week
    const weeklySalesData = salesData.filter((sale) => {
      const saleDate = new Date(sale.sales_date);
      return saleDate >= startDate && saleDate <= endDate;
    });

    // Calculate the total earnings for the current week
    const weekly = weeklySalesData.reduce((total, sale) => {
      const earnings = parseFloat(sale[`${key}`]);
      return !isNaN(earnings) ? total + earnings : total;
    }, 0);

    // Calculate the total earnings
    const toto = salesData.reduce((total, sale) => {
      const earnings = parseFloat(sale[`${key}`]);
      return !isNaN(earnings) ? total + earnings : total;
    }, 0);

    if (key === "total_revenue") {
      this.total_weekly_revenue = weekly;
    }

    if (key === "total_sales") {
      this.total_weekly_sales = weekly;
    }

    // Calculate the weekly earnings as a percentage of the total earnings
    const weeklyEarningsPercentage = toto !== 0 ? (weekly / toto) * 100 : 0;

    // Round the percentage to the nearest whole number and return it as a single-element array
    return [Math.round(weeklyEarningsPercentage)];
  }

  getTotReForAllSales(data: any[]) {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i].total_revenue;
    }
    return total;
  }

  getSales() {
    const url =
      environment.E_SHOP_BASE_URL + environment.IMS.IMS_DASHBOARD_SALES;
    this.repositoryService.getList(
      url,
      (data) => {
        this.isLoadingDashboard = false;
        this.NumberofSales = data.length;
        this.SalesRevenue = 0;
        this.SalesData = data;
        this.getTotalRevenueByYear(data);

        this.SalesRevenue = this.getTotReForAllSales(data);

        this.todayRevenue = this.getTodayRevenue(data);

        this.currentMonthRevenue = this.getCurrentMonthRevenue(data);
        this.currentMonthRevenuePercentage =
          this.getCurrentMonthRevenuePercentage(data);
        this.previousYearRevenue = this.getPreviousYearRevenue(data);

        this.currentYearRevenue = this.getCurrentYearRevenue(data);

        this.threeMonthSalesPercentage =
          this.getThreeMonthSalesPercentage(data);
        this.weeklysalesData = this.calculateWeeklyEarnings(
          data,
          "total_sales"
        );
        this.weeklyEarningData = this.calculateWeeklyEarnings(
          data,
          "total_revenue"
        );

        console.log(this.weeklyEarningData);

        this._fetchData();
      },
      (error) => {
        console.log(error);
        this.customAlert.errorToast(
          "Error in fetching sales details",
          "Something went wrong, please try again later",
          "error"
        );
      }
    );
  }

  exportExcel(): void {
    /* pass here the table id */
    let element = document.getElementById("excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* save to file */
    XLSX.writeFile(wb, "Sales.xlsx");
  }

  filterByDate() {
    const url =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_DASHBOARD_SALES +
      `?sales_date_from=${this.fromDate}&sales_date_to=${this.toDate}`;
    this.repositoryService.getList(
      url,
      (data) => {
        this.isLoadingDashboard = false;
        this.NumberofSales = data.length;
        this.SalesData = data;
        this.getTotalRevenueByYear(data);
        this.SalesRevenue = 0;
        this.SalesRevenue = this.getTotReForAllSales(data);

        this.todayRevenue = this.getTodayRevenue(data);

        this.currentMonthRevenue = this.getCurrentMonthRevenue(data);
        this.currentMonthRevenuePercentage =
          this.getCurrentMonthRevenuePercentage(data);
        this.previousYearRevenue = this.getPreviousYearRevenue(data);

        this.currentYearRevenue = this.getCurrentYearRevenue(data);
        console.log(
          `Total revenue for the current year: ${this.currentYearRevenue}`
        );

        this.threeMonthSalesPercentage =
          this.getThreeMonthSalesPercentage(data);
        console.log(
          `Sales of the last three months as a percentage of the total sales of the current year: ${this.threeMonthSalesPercentage}`
        );

        this.weeklyEarningData = this.calculateWeeklyEarnings(
          data,
          "total_revenue"
        );

        this.weeklysalesData = this.calculateWeeklyEarnings(
          data,
          "total_sales"
        );
        this._fetchData();
      },
      (error) => {
        this.customAlert.errorToast(
          "Error in fetching sales details",
          "Something went wrong, please try again later",
          "error"
        );
      }
    );
  }

  getallExpense() {
    const url =
      environment.E_SHOP_BASE_URL + environment.IMS.IMS_EXPENSES_BASE_URL;
    this.repositoryService.getList(
      url,
      (data) => {
        console.log(data);
        this.totalExpenses = data.reduce((total, expense) => {
          let amount = Number(expense.amount);
          return total + (isNaN(amount) ? 0 : amount);
        }, 0);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getallStock() {
    const url =
      environment.E_SHOP_BASE_URL + environment.IMS.IMS_STOCK_BASE_URL;
    this.repositoryService.getList(
      url,
      (data) => {
        this.stockModel = data;
      },
      (error) => {
        console.log(error);

        this.customAlert.errorToast(
          "Error in fetching sales details",
          "Something went wrong, please try again later",
          "error"
        );
      }
    );
  }
}
