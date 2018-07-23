import { MiddlewareAPI, Store } from "redux";
import actions from "./actions";
/** 
 * Hacky
 */
export default function bindActions<TAuthHandlerActions extends { [key: string]: any }>(store: MiddlewareAPI | Store): TAuthHandlerActions {
    return Object.keys(actions)
        .reduce((out, key) => {
            out[key] = (...args: any[]) => store.dispatch((actions as any)[key](...args));
            return out;
        }, {} as TAuthHandlerActions);
}