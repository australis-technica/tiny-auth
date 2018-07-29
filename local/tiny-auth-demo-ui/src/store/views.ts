import { adapter as rootAdapter } from "../app";
import { customersViewState } from "../api-customers";
import {
  store as apiiCustomersAddStore,
  formStore as apiCustomersAddFormStore
} from "../api-customers-add";
import { productAdAdapter, productsViewState } from "../api-products";
import { adapter as home } from "../home";
/**
 *
 */
export default {
  [rootAdapter.storeKey]: rootAdapter.reducer,
  [home.storeKey]: home.reducer,
  [customersViewState.storeKey]: customersViewState.reducer,
  [apiiCustomersAddStore.storeKey]: apiiCustomersAddStore.reducer,
  [productAdAdapter.storeKey]: productAdAdapter.reducer,
  [productsViewState.storeKey]: productsViewState.reducer,
  [apiCustomersAddFormStore.storeKey]: apiCustomersAddFormStore.reducer
};
