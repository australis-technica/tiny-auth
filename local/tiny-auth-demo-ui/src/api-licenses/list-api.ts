import crudApi from "../crud-api";
const defaultState = { busy: false, error: undefined };
const api = crudApi("licenses", defaultState);
export default api;