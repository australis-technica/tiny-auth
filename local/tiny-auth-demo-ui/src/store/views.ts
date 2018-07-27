import { adapter as rootAdapter } from "../app";
import { customersViewState, customerAddState } from "../customers";
import { productAdAdapter, productsViewState } from "../products";
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
  [productsViewState.storeKey]: productsViewState.reducer
};
