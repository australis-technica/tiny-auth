import { api as apiCustomerLookupFieldApi } from "../api-customer-lookup-field";
import { api as apiCustomersAdd } from "../api-customers-add";
import { api as apiCustomersList } from "../api-customers-list";
import { api as apiLicenseAdd } from "../api-licenses-add";
import { api as apiLicenseList } from "../api-license-list";
import { api as productsListApi } from "../api-product-list";
import { api as apiProductLookupField } from "../api-product-lookup-field";
import { api as apiProductsAdd } from "../api-products-add";

export default {
    // ...
    [apiCustomersList.storeKey]: apiCustomersList.reducer,
    [apiCustomersAdd.storeKey]: apiCustomersAdd.reducer,
    [apiCustomerLookupFieldApi.storeKey]: apiCustomerLookupFieldApi.reducer,
    // ...
    [productsListApi.storeKey]: productsListApi.reducer,
    [apiProductsAdd.storeKey]: apiProductsAdd.reducer,
    [apiProductLookupField.storeKey]: apiProductLookupField.reducer,
    // ...
    [apiLicenseAdd.storeKey]: apiLicenseAdd.reducer,
    [apiLicenseList.storeKey]: apiLicenseList.reducer
};
