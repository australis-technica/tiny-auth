import { default as login } from "./login";
import { default as profile } from "./profile";
import { default as refresh } from "./refresh";
/** */
export default {
    login,
    profile,
    refresh,
    logout: ()=> { throw new Error("Logout is Not implemented")}
};