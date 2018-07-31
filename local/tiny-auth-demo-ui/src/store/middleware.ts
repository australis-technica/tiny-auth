import { api as apiCustomersList } from "../api-customers-list";
import * as apiCustomresAdd from "../api-customers-add";
import * as apiProductsAdd from "../api-products-add";
import * as apiLicAdd from "../api-licenses-add";
import { list as apiLicList } from "../api-licenses";
import { api as apiCustomerLookupFieldApi} from "../api-customer-lookup-field";
import { api as apiProductLookupField } from "../api-product-lookup-field";
/**
 *
 */
export default [
  apiCustomersList.middleware,
  // products.middleware,
  // ...
  apiCustomresAdd.api.middleware,
  apiCustomresAdd.validation.middleware,  
  apiCustomerLookupFieldApi.middleware,
  // ..  
  apiProductsAdd.api.middleware,
  apiProductsAdd.validation.middleware,
  apiProductLookupField.middleware,
  // ...
  apiLicAdd.api.middleware,
  apiLicAdd.validation.middleware,
  // ...
  apiLicList.api.middleware,
];
