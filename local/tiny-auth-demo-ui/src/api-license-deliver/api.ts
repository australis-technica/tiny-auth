import crudApi, { CrudApiState, CrudApiActions } from "../crud-api";
/** */
export type ApiState = CrudApiState<any> & {

}
/** */
export type ApiActions = CrudApiActions & {
    deliver(id: string): any;
}
// ...
const defaultState = { busy: false, error: undefined, data: [] };
const { REACT_APP_API_BASE, REACT_APP_API_LICENSES } = process.env;
/** */
const api = crudApi<any>("license-deliver", defaultState, {
    endpoint: `${REACT_APP_API_BASE}/${REACT_APP_API_LICENSES}`
});
export default api;
