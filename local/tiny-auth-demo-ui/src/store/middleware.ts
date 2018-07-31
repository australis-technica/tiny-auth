import { licenses } from "../apis";
import { api as customersApi } from "../api-customers";
import * as apiCustomresAdd from "../api-customers-add";
import * as apiProductsAdd from "../api-products-add";
import * as apiLicAdd from "../api-licenses-add";
/**
 *
 */
export default [
  customersApi.middleware,
  // products.middleware,
  // ...
  apiCustomresAdd.api.middleware,
  apiCustomresAdd.validation.middleware,
  // ..  
  apiProductsAdd.api.middleware,
  apiProductsAdd.validation.middleware,
  // ...
  apiLicAdd.api.middleware,
  apiLicAdd.validation.middleware,
  // ...
  licenses.middleware
];
