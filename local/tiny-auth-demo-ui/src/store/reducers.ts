import * as auth from "@australis/tiny-auth-redux";
import { customers, products, licenses } from "../apis";
import messages from "../messages";

export default {
    [auth.STORE_KEY]: auth.reducer,
    [customers.storeKey]: customers.reducer,
    [products.storeKey]: products.reducer,
    [licenses.storeKey]: licenses.reducer,  
    [messages.storeKey]  : messages.reducer
  }