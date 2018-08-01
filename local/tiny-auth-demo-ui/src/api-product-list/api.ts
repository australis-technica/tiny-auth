import createApiAdapter from "../crud-api";
const { REACT_APP_API_BASE, REACT_APP_API_PRODUCTS } = process.env;
const defaultState = { busy: false, error: undefined };
const endpoint = `${REACT_APP_API_BASE}/${REACT_APP_API_PRODUCTS}`;
const api = createApiAdapter("product-list", defaultState, { endpoint });
export default api;
