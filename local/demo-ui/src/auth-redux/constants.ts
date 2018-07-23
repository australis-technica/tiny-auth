import { AuthState, User } from "@australis/tiny-auth-core";
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
export const defaultState: AuthState = {
    busy: false,
    profile: defautlUser,
    token: "",
    error: undefined,
    authenticated: false
}
