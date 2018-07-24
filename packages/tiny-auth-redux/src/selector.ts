import { STORE_KEY } from "./constants";
import { AuthState } from "@australis/tiny-auth-core";
/** */
export default (state: {  [key: string]:  any }) => state[STORE_KEY] as AuthState;