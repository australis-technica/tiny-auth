import * as auth from "@australis/tiny-auth-redux";
import { products, licenses } from "../apis";
import { api as customersApi } from "../api-customers";
import { api as customersAddApi } from "../api-customers-add";
import messages from "../messages";

export default {
  [auth.STORE_KEY]: auth.reducer,
  [customersApi.storeKey]: customersApi.reducer,
  [products.storeKey]: products.reducer,
  [licenses.storeKey]: licenses.reducer,
  [messages.storeKey]: messages.reducer,
  [customersAddApi.storeKey]: customersAddApi.reducer
};
