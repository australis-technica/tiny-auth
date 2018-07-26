import { Middleware, Action } from "redux";
import crudApi from "./crud-api";
import { selector } from "@australis/tiny-auth-redux";
import actions from "./actions";
import actionTypes from "./action-types";

const isDev = process.env.NODE_ENV !== "production";
const FETCH_DELAY = 1000;
/**
 * 
 */
export default function (endpoint: string): Middleware {

    const { clearError, setError, setBusy, setResult } = actions(endpoint);
    const { FETCH } = actionTypes(endpoint);
    const delay = (n: number) => new Promise(resolve => setTimeout(resolve, n));
    /**
     * Middleware
     */
    return function (store) {

        const api = crudApi(() => selector(store.getState()), endpoint);

        return function (next) {

            return async function <A extends Action & { payload: any, meta?: any, error?: Error | string }>(action: A) {

                if (action.type === FETCH) {
                    const { payload, error } = action;
                    if (error) {
                        return next(setError(error))
                    }
                    try {
                        next(clearError());
                        next(setBusy(true));
                        if (isDev) await delay(FETCH_DELAY);
                        const x = await api(payload);
                        return next(setResult(x, payload));
                    } catch (error) {
                        return next(setError(error));
                    } finally {
                        next(setBusy(false));
                    }
                }
                return next(action)
            }
        }
    }
}