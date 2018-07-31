import createApiAdapter from "../crud-api";
const api = createApiAdapter("products", { busy: false, error: undefined });
export default api;
