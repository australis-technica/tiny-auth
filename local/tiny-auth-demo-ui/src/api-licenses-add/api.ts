import crudApi from "../crud-api";
const defaultState = {
  busy: false,
  error: undefined
};
const api = crudApi("licenses-add", defaultState, {
  endpoint: "http://localhost:4888/api/licenses"
});
export default api;