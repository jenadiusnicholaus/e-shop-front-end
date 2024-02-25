import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "MENUITEMS.MENU.TEXT",
    isTitle: true,
  },
  {
    id: 2,
    label: "MENUITEMS.DASHBOARDS.TEXT",
    icon: "ri-dashboard-line",
    // badge: {
    //   variant: "success",
    //   text: "MENUITEMS.DASHBOARDS.BADGE",
    // },
    link: "/",
  },
  {
    id: 3,
    label: "MENUITEMS.CATEGORY.TEXT",
    icon: "ri-table-line",
    // badge: {
    //   variant: "success",
    //   text: "MENUITEMS.DASHBOARDS.BADGE",
    // },

    link: "category/",
  },

  {
    id: 4,
    label: "MENUITEMS.PRODUCTS.TEXT",
    icon: "ri-table-line",
    // badge: {
    //   variant: "success",
    //   text: "MENUITEMS.DASHBOARDS.BADGE",
    // },

    link: "products/",
  },
  {
    id: 4,
    label: "MENUITEMS.STOCK.TEXT",
    icon: "ri-store-2-line",
    // badge: {
    //   variant: "success",
    //   text: "MENUITEMS.DASHBOARDS.BADGE",
    // },

    link: "stock/",
  },

  {
    id: 5,
    label: "MENUITEMS.EXPENSES.TEXT",
    icon: "ri-store-2-line",
    // badge: {
    //   variant: "success",
    //   text: "MENUITEMS.DASHBOARDS.BADGE",
    // },

    link: "expenses/",
  },

  {
    id: 5,
    label: "MENUITEMS.SHOPS.TEXT",
    icon: "ri-store-2-line",
    // badge: {
    //   variant: "success",
    //   text: "MENUITEMS.DASHBOARDS.BADGE",
    // },

    link: "shops/",
  },
];
