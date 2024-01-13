// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let API_VERSION = "v1";
export const environment = {
  production: false,
  defaultauth: 'fackbackend',
  DEFAULTAUTH: 'E_SHOP_AUTH',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  },
// http://localhost:8000/api/ims/v1/category/?category_id=90
  E_SHOP_BASE_URL : "http://127.0.0.1:8000/api/",
  AUTHENTICATION :{
    AUTHENTICATION_BASE_URL : `authentication/${API_VERSION}/`,
    REGISTER_URL : "register/",
    LOGIN_URL : 'login/',
    USER_PROFILE : "user-profile/",
  },

  IMS: {
    IMS_BASE_URL : `category/${API_VERSION}/`,
    CATEGORY_BASE_URL: 'category_vset/',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
