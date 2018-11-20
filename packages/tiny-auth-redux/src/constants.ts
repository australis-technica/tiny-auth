import { AuthState, User } from "./types";
/** */
export const STORE_KEY = "auth";
/** */
export const defautlUser: User = {
    id: "",
    displayName: "",
    email: "",
    roles: ""
}
/** */
export const TOKEN_KEY = "token";
/** */
export const defaultState: AuthState = {
    busy: false,
    profile: defautlUser,
    token: localStorage.getItem(TOKEN_KEY) || "",
    error: undefined,
    authenticated: false,
    passwordChanged: false,
    passwordChanging: false
}
