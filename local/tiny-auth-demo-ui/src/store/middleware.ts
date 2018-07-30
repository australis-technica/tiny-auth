import { products, licenses } from "../apis";
import { api as customersApi } from "../api-customers";
import { api as customersAddApi } from "../api-customers-add";
import { api as productsAppApi } from "../api-products-add";
/**
 *
 */
export default [
  customersApi.middleware,
  customersAddApi.middleware,
  products.middleware,
  productsAppApi.middleware,
  licenses.middleware
];
