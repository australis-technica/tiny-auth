import { STORE_KEY } from "./constants";
import { AuthState } from "./types";
/** */
export default (state: {  [key: string]:  any }) => state[STORE_KEY] as AuthState;
