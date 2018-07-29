import crudApi from "../crud-api";
const api = crudApi("customers", {
    busy: false,
    error: undefined
  });
export default api;