import { FluxStandardAction } from "flux-standard-action";
import { User } from "../auth-core";
import { STORE_KEY } from "./constants";
/** */
const CLEAR_ERROR = `${STORE_KEY}/clear-error`;
const CLEAR_PROFILE = `${STORE_KEY}/clear-profile`;
const SET_BUSY = `${STORE_KEY}/set-busy`;
const SET_ERROR = `${STORE_KEY}/set-error`;
const SET_PROFILE = `${STORE_KEY}/set-profile`;
const SET_TOKEN = `${STORE_KEY}/set-token`;
const SET_AUTHENTICATED =`${STORE_KEY}/set-loggedin`;
/** */
export const actionTypes = {
    CLEAR_ERROR,
    CLEAR_PROFILE,
    SET_BUSY,
    SET_ERROR,
    SET_PROFILE,
    SET_TOKEN,
    SET_AUTHENTICATED,    
}
/** */
/** */
const clearError = (): FluxStandardAction<undefined> => ({
  type: CLEAR_ERROR,
  payload: undefined,
  meta: undefined,
});
/** */
const clearProfile = (): FluxStandardAction<undefined> => ({
  type: CLEAR_PROFILE,
  payload: undefined,
  meta: undefined,
});
/** */
const setBusy = (payload: boolean): FluxStandardAction<boolean> => ({
  type: SET_BUSY,
  payload,
  meta: undefined,
});
/** */
const setError = (payload: string | Error): FluxStandardAction<string | Error> => ({
  type: SET_ERROR,
  payload,
  meta: undefined,
});
/** */
const setProfile = (payload: User): FluxStandardAction<User> => {
  return { type: SET_PROFILE, payload, meta: undefined };
};
/** */
const setToken = (payload: string): FluxStandardAction<string> => ({
  type: SET_TOKEN,
  payload,
  meta: undefined,
});
/** */
const setAuthenticated = (payload: boolean)=>({
  type: SET_AUTHENTICATED,
  payload,
  meta: undefined
});
/** */
export default {
  clearError,
  clearProfile,
  setBusy,
  setError,
  setProfile,
  setToken,
  setAuthenticated
};