import * as auth from "@australis/tiny-auth-redux";
import { api as customersApi } from "../api-customers";
import { api as customersAddApi } from "../api-customers-add";
import { api as productsAddApi } from "../api-products-add";
import { store as lic } from "../api-licenses";
import { api  as apiLicAdd } from "../api-licenses-add";
import {listApi as productsListApi } from "../api-products";
import messages from "../messages";

export default {
  [auth.STORE_KEY]: auth.reducer,
  [messages.storeKey]: messages.reducer,
  // ...
  [customersApi.storeKey]: customersApi.reducer,
  [customersAddApi.storeKey]: customersAddApi.reducer,
  // ...
  [productsListApi.storeKey]: productsListApi.reducer,
  [productsAddApi.storeKey]: productsAddApi.reducer,
  // ...
  [lic.storeKey]: lic.reducer,  
  [apiLicAdd.storeKey]: apiLicAdd.reducer,
};
