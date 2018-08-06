import { api as apiCustomersList } from "../api-customers-list";
import * as apiCustomresAdd from "../api-customers-add";
import * as apiProductsAdd from "../api-products-add";
import * as apiLicAdd from "../api-licenses-add";
import { api as apiLicenseList } from "../api-license-list";
import { api as apiCustomerLookupFieldApi } from "../api-customer-lookup-field";
import { api as apiProductLookupField } from "../api-product-lookup-field";
import { api as apiLicDeliver } from "../api-license-deliver";
import { api as apiLicDelete } from "../api-license-delete";
import { api as apiLicEdit } from "../api-license-edit";
import { Middleware } from "redux";
/** */
const middleware: Middleware[] = [
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
  apiLicenseList.middleware,
  apiLicDeliver.middleware,
  apiLicDelete.middleware,
  apiLicEdit.middleware
];
export default middleware;
