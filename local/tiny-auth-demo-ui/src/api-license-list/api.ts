import crudApi from "../crud-api";
const defaultState = { busy: false, error: undefined };
const { REACT_APP_API_BASE, REACT_APP_API_LICENSES } = process.env;
/** */
const api = crudApi("license-list", defaultState, {
  endpoint: `${REACT_APP_API_BASE}/${REACT_APP_API_LICENSES}`
});
export default api;
