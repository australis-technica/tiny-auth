import { AuthState } from "../auth-core";
import { User } from "../auth-core";
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
