import { products, licenses } from "../apis";
import { api as customersApi} from "../api-customers";
import { api as customersAddApi} from "../api-customers-add";
/**
 *
 */
export default [
  customersApi.middleware,
  customersAddApi.middleware,
  products.middleware,
  licenses.middleware  
];
