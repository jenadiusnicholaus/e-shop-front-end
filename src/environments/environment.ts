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
  E_SHOP_BASE_URL: "http://127.0.0.1:8000/api/",

  // for midea
  E_SHOP_MEDIA_BASE_URL: "http://127.0.0.1:8000",

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
    // http://localhost:8000/api/sales/v1/sales_history_vset/?stock_item_id=60
    IMS_SALES_HISTORY_URL: `sales/${API_VERSION}/sales_history_vset/`,

    IMS_STOCK_ITEMS_LIST_WITH_NO_PAGENATION: `stock/${API_VERSION}/stock-items-list/`,
    IMS_STOCK_ITEM_OBJ: `stock/${API_VERSION}/get-stock-items/`,
    // http://localhost:8000/api/sales/v1/sales_vset/?stock_id=2
    IMS_SALES_LIST_BY_STOCK: `sales/${API_VERSION}/sales_vset/`,
    // http://localhost:8000/api/stock/v1/search/?search-text=ts1
    IMS_STOCK_ITEM_SEARCH: `stock/${API_VERSION}/search/`,
    // http://localhost:8000/api/dashboard/v1/dashboard-sales/
    IMS_DASHBOARD_SALES: `dashboard/${API_VERSION}/dashboard-sales/`,
    // http://localhost:8000/api/expenses/v1/expenses_vset/
    IMS_EXPENSES_BASE_URL: `expenses/${API_VERSION}/expenses_vset/`,

    // http://localhost:8000/api/products/v1/product-details/?product_id=22

    IMS_PRODUCT_DETAILS: `products/${API_VERSION}/product-details/`,

    // http://localhost:8000/api/products/v1/product-image_vset/

    IMS_PRODUDCT_IMAGES: `products/${API_VERSION}/product-image_vset/`,

    // http://localhost:8000/api/products/v1/product-color_vset/

    IMS_PRODUDCT_COLOR: `products/${API_VERSION}/product-color_vset/`,

    // http://localhost:8000/api/products/v1/product-size_vset/

    IMS_PRODUDCT_SIZE: `products/${API_VERSION}/product-size_vset/`,

    // http://localhost:8000/api/products/v1/product-specs_vset/?product_id=26

    IMS_PRODUDCT_SPECS: `products/${API_VERSION}/product-specs_vset/`,

    // http://localhost:8000/api/shops/v1/shop_vset/?shop_id=1

    IMS_SHOP: `shops/${API_VERSION}/shop_vset/`,
  },
};
