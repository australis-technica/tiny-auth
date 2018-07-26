import * as auth from "@australis/tiny-auth-redux";

import { customers, products, licenses } from "../apis";

export default {
    [auth.STORE_KEY]: auth.reducer,
    [customers.storeKey]: customers.reducer,
    [products.storeKey]: products.reducer,
    [licenses.storeKey]: licenses.reducer,    
  }