import crudApi from "../crud-api";
const defaultState = {
  busy: false,
  error: undefined
};
const api = crudApi("customers-add", defaultState, {
  endpoint: "http://localhost:4888/api/customers"
});
export default api;