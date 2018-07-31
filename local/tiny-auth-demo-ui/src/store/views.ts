import { adapter as rootAdapter } from "../app";
import { customersViewState } from "../api-customers";
import { store } from "../api-products";
import * as api_lic_add from "../api-licenses-add";
import { adapter as home } from "../home";
import {
  store as apiProductsAdd,
  formStore as apiProductsAddForm
} from "../api-products-add";
import {
  store as apiCustomersAddStore,
  formStore as apiCustomersAddFormStore
} from "../api-customers-add";
/**
 *
 */
export default {
  [rootAdapter.storeKey]: rootAdapter.reducer,
  [home.storeKey]: home.reducer,
  [customersViewState.storeKey]: customersViewState.reducer,
  [apiCustomersAddStore.storeKey]: apiCustomersAddStore.reducer,
  // [store.storeKey]: store.reducer,
  [store.storeKey]: store.reducer,
  [apiCustomersAddFormStore.storeKey]: apiCustomersAddFormStore.reducer,
  // ...
  [apiProductsAdd.storeKey]: apiProductsAdd.reducer,
  [apiProductsAddForm.storeKey]: apiProductsAddForm.reducer,
  // ...
  [api_lic_add.store.storeKey]: api_lic_add.store.reducer,
  [api_lic_add.formStore.storeKey]: api_lic_add.formStore.reducer
};
