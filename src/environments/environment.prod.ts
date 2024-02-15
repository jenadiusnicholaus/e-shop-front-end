// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let API_VERSION = "v1";
export const environment = {
  production: false,
  defaultauth: "fackbackend",
  DEFAULTAUTH: "E_SHOP_AUTH",
  firebaseConfig: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
  },
  // http://localhost:8000/api/ims/v1/category/?category_id=90
  // E_SHOP_BASE_URL: "http://127.0.0.1:8000/api/",
  E_SHOP_BASE_URL: "https://eshop.codingskills.dev/api/",
  AUTHENTICATION: {
    AUTHENTICATION_BASE_URL: `authentication/${API_VERSION}/`,
    REGISTER_URL: "register/",
    LOGIN_URL: "login/",
    USER_PROFILE: "user-profile/",
  },

  IMS: {
    IMS_CAT_BASE_URL: `category/${API_VERSION}/`,
    CATEGORY_SUB_BASE_URL: "category_vset/",
    CATEGORY_LIST_WITH_NO_PAGENATION: `category-list/`,
    IMS_PRODUCT_BASE_URL: `products/${API_VERSION}/product_vset/`,
    IMS_STOCK_BASE_URL: `stock/${API_VERSION}/stock_vset/`,
    IMS_STOCK_ITEMS_BASE_URL: `stock/${API_VERSION}/stock-items_vset/`,
    IMS_PRODUCT_LIST_WITH_NO_PAGENATION: `products/${API_VERSION}/product-list/`,
    IMS_SALES_BASE_URL: `sales/${API_VERSION}/sales_vset/`,
    IMS_SALES_HISTORY_URL: `sales/${API_VERSION}/sales_history_vset/`,

    IMS_STOCK_ITEMS_LIST_WITH_NO_PAGENATION: `stock/${API_VERSION}/stock-items-list/`,
    IMS_STOCK_ITEM_OBJ: `stock/${API_VERSION}/get-stock-items/`,
    // http://localhost:8000/api/sales/v1/sales_vset/?stock_id=2
    IMS_SALES_LIST_BY_STOCK: `sales/${API_VERSION}/sales_vset/`,
    IMS_STOCK_ITEM_SEARCH: `stock/${API_VERSION}/search/`,
    IMS_DASHBOARD_SALES: `dashboard/${API_VERSION}/dashboard-sales/`,
    // http://localhost:8000/api/expenses/v1/expenses_vset/
    IMS_EXPENSES_BASE_URL: `expenses/${API_VERSION}/expenses_vset/`,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
