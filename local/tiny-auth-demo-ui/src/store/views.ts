import { adapter as rootAdapter } from "../app";
import { customersViewState } from "../api-customers";
import { productAdAdapter, productsViewState } from "../api-products";
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
  [productAdAdapter.storeKey]: productAdAdapter.reducer,
  [productsViewState.storeKey]: productsViewState.reducer,
  [apiCustomersAddFormStore.storeKey]: apiCustomersAddFormStore.reducer,
  [apiProductsAdd.storeKey]: apiProductsAdd.reducer,
  [apiProductsAddForm.storeKey]: apiProductsAddForm.reducer
};
