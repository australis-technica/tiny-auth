import * as auth from "@australis/tiny-auth-redux";
import { api as apiCustomersList } from "../api-customers-list";
import { api as apiCustomersAdd } from "../api-customers-add";
import { api as apiProductsAdd } from "../api-products-add";
import { store as lic } from "../api-licenses";
import { api as apiLicAdd } from "../api-licenses-add";
import { listApi as productsListApi } from "../api-products";
import messages from "../messages";
import { api as customerLookupFieldApi } from "../api-customers-list/lookup-field";


export default {
  [auth.STORE_KEY]: auth.reducer,
  [messages.storeKey]: messages.reducer,
  // ...
  [apiCustomersList.storeKey]: apiCustomersList.reducer,
  [apiCustomersAdd.storeKey]: apiCustomersAdd.reducer,
  [customerLookupFieldApi.storeKey]: customerLookupFieldApi.reducer,
  // ...
  [productsListApi.storeKey]: productsListApi.reducer,
  [apiProductsAdd.storeKey]: apiProductsAdd.reducer,
  // ...
  [lic.storeKey]: lic.reducer,
  [apiLicAdd.storeKey]: apiLicAdd.reducer,
};
