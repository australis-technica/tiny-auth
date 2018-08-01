import * as auth from "@australis/tiny-auth-redux";
import { api as apiCustomerLookupFieldApi } from "../api-customer-lookup-field";
import { api as apiCustomersAdd } from "../api-customers-add";
import { api as apiCustomersList } from "../api-customers-list";
import { store as lic } from "../api-licenses";
import { api as apiLicAdd } from "../api-licenses-add";
import { api as productsListApi } from "../api-product-list";
import { api as apiProductLookupField } from "../api-product-lookup-field";
import { api as apiProductsAdd } from "../api-products-add";
import messages from "../messages";

export default {
  [auth.STORE_KEY]: auth.reducer,
  [messages.storeKey]: messages.reducer,
  // ...
  [apiCustomersList.storeKey]: apiCustomersList.reducer,
  [apiCustomersAdd.storeKey]: apiCustomersAdd.reducer,
  [apiCustomerLookupFieldApi.storeKey]: apiCustomerLookupFieldApi.reducer,
  // ...
  [productsListApi.storeKey]: productsListApi.reducer,
  [apiProductsAdd.storeKey]: apiProductsAdd.reducer,
  [apiProductLookupField.storeKey]: apiProductLookupField.reducer,
  // ...
  [lic.storeKey]: lic.reducer,
  [apiLicAdd.storeKey]: apiLicAdd.reducer,
};
