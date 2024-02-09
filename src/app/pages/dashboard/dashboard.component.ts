import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  Validators,
  UntypedFormGroup,
} from "@angular/forms";
import { latLng, tileLayer } from "leaflet";

import { ChartType, Stat, Chat, Transaction } from "./dashboard.model";

import {
  statData,
  revenueChart,
  salesAnalytics,
  sparklineEarning,
  sparklineMonthly,
  chatData,
  transactions,
} from "./data";
import { en } from "@fullcalendar/core/internal-common";
import { environment } from "src/environments/environment";
import { RepositoryService } from "../repository.service";

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

  isLoadingDashboard = false;

  threeMonthSalesPercentage: any;

  underconstraction = false;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private repositoryService: RepositoryService
  ) {}

  // bread crumb items
  breadCrumbItems: Array<{}>;

  revenueChart: ChartType;
  salesAnalytics: ChartType;
  sparklineEarning: ChartType;
  sparklineMonthly: ChartType;

  // Form submit
  chatSubmit: boolean;

  formData: UntypedFormGroup;

  options = {
    layers: [
      tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "...",
      }),
    ],
    zoom: 6,
    center: latLng(46.879966, -121.726909),
  };

  ngOnInit(): void {
    this.isLoadingDashboard = true;
    this.getSales();
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
    console.log("rdata.series[0].data");
    console.log(rdata.series[0].data);

    console.log("rdata.series[1].data");
    console.log(rdata.series[1].data);

    return rdata;
  }

  private _fetchData() {
    this.revenueChart = this.getrevenueChart();
    this.salesAnalytics = this.getSalesAnalytics();
    this.sparklineEarning = sparklineEarning;
    this.sparklineMonthly = sparklineMonthly;
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
    console.log("totalRevenueForYear");
    console.log(totalRevenueForYear);

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

  /**
   * Save the message in chat
   */
  messageSave() {
    const message = this.formData.get("message").value;
    const currentDate = new Date();
    if (this.formData.valid && message) {
      // Message Push in Chat
      this.chatData.push({
        align: "right",
        name: "Ricky Clark",
        message,
        time: currentDate.getHours() + ":" + currentDate.getMinutes(),
      });

      // Set Form Data Reset
      this.formData = this.formBuilder.group({
        message: null,
      });
    }

    this.chatSubmit = true;
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
        title: "Average Price",
        value: "$ 15.4",
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

  getSales() {
    const url =
      environment.E_SHOP_BASE_URL + environment.IMS.IMS_DASHBOARD_SALES;
    this.repositoryService.getList(
      url,
      (data) => {
        this.isLoadingDashboard = false;
        this.NumberofSales = data.length;
        this.SalesData = data;
        this.getTotalRevenueByYear(data);
        for (let i = 0; i < data.length; i++) {
          this.SalesRevenue += data[i].total_revenue;
          console.log(data[i].total_revenue);
        }

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

        this._fetchData();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
