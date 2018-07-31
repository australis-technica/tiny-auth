import { api as apiCustomersList } from "../api-customers-list";
import * as apiCustomresAdd from "../api-customers-add";
import * as apiProductsAdd from "../api-products-add";
import * as apiLicAdd from "../api-licenses-add";
import { list as apiLicList } from "../api-licenses";
import { api as customerLookupFieldApi} from "../api-customers-list/lookup-field";

/**
 *
 */
export default [
  apiCustomersList.middleware,
  // products.middleware,
  // ...
  apiCustomresAdd.api.middleware,
  apiCustomresAdd.validation.middleware,  
  customerLookupFieldApi.middleware,
  // ..  
  apiProductsAdd.api.middleware,
  apiProductsAdd.validation.middleware,
  // ...
  apiLicAdd.api.middleware,
  apiLicAdd.validation.middleware,
  // ...
  apiLicList.api.middleware,
];
