import crudApi from "../crud-api";
const defaultState = {
  busy: false,
  error: undefined
};
const api = crudApi("products-add", defaultState, {
  endpoint: "http://localhost:4888/api/products"
});
export default api;