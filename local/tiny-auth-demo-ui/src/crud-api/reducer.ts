import { Reducer } from "redux";
import actionTypes from "./action-types";
/**
 * 
 * @param endpoint 
 */
export default function (endpoint: string, defaultState: {}): Reducer {
    const { BUSY, ERROR, FETCH, RESULT } = actionTypes(endpoint);
    /**
     * 
     */
    return (state = defaultState, action) => {

        switch (action.type) {
            case BUSY: {
                const { payload } = action;
                return Object.assign({}, state, { busy: payload });
            }
            case FETCH: {
                // const { payload } = action;
                // return Object.assign({}, state, { busy: payload });
                return state;
            }
            case RESULT: {
                const { payload, meta } = action;
                // TODO: set Different results?
                const key = meta && meta.resultKey ? meta.resultKey : "data";
                return Object.assign({}, state, { [key]: payload });
            }
            case ERROR: {
                const { payload } = action;
                const error = typeof payload === "string" ? payload : (payload && payload.message) ? payload.message : payload;
                return Object.assign({}, state, { error });
            }
            default: return state;
        }
    }
}