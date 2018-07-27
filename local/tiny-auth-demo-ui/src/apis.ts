import crudApi from "./crud-api";
export const customers = crudApi("customers", {
  busy: false,
  error: undefined
});
export const products = crudApi("products", { busy: false, error: undefined });
export const licenses = crudApi("licenses", { busy: false, error: undefined });
