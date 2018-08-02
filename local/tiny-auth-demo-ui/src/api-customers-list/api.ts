import crudApi from "../crud-api";
const api = crudApi("customers", {
  busy: false,
  error: undefined,
  data: []
});
export default api;