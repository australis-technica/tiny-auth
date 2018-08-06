import crudApi, { CrudApiState, CrudApiActions } from "../crud-api";
/** */
export type ApiState = CrudApiState<any> & {

}
/** */
export type ApiActions = CrudApiActions & {
    deliver(id: string): any;
}
export interface ApiItem {
    id: string;
    displayName: string;
}
// ...
const defaultState = { busy: false, error: undefined, data: [] };
const { REACT_APP_API_BASE } = process.env;
/** */
const api = crudApi<any>("license-deliver", defaultState, {
    endpoint: `${REACT_APP_API_BASE}/api/v1/deliver`
});
export default api;
