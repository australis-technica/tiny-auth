import { adapter as rootAdapter } from "../app";
import { customersViewState, customerAddState, customerAddFormDataStore } from "../api-customers";
import { productAdAdapter, productsViewState } from "../api-products";
import { adapter as home } from "../home";
/**
 *
 */
export default {
  [rootAdapter.storeKey]: rootAdapter.reducer,
  [home.storeKey]: home.reducer,
  [customersViewState.storeKey]: customersViewState.reducer,
  [customerAddState.storeKey]: customerAddState.reducer,
  [productAdAdapter.storeKey]: productAdAdapter.reducer,
  [productsViewState.storeKey]: productsViewState.reducer,
  [customerAddFormDataStore.storeKey]: customerAddFormDataStore.reducer
};
