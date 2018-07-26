import crudApi from "./crud-api";
export const customers = crudApi("customers", {});
export const products = crudApi("products", {});
export const licenses = crudApi("licenses", {});