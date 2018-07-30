import { Reducer, AnyAction } from "redux";
import actionTypes from "./action-types";
import { CrudApiOptions, CrudApiState } from "./types";
import defaultOptions from "./default-options";
/**
 *
 * @param endpoint
 */
export default function (
  endpoint: string,
  defaultState: CrudApiState,
  options: Partial<CrudApiOptions> = defaultOptions
): Reducer {
  const { CLEAR_ERROR, CLEAR_RESULT, CLEAR_SUCCESS, FETCH, SET_BUSY, SET_ERROR, SET_RESULT } = actionTypes(endpoint);
  const o: CrudApiOptions = Object.assign({}, defaultOptions, options);
  const { resultKey } = o;
  /**
   *
   */
  return (state: CrudApiState = defaultState, action: AnyAction) => {
    switch (action.type) {
      case SET_BUSY: {
        const { payload } = action;
        const busy = !!payload;
        if (busy) {
          return Object.assign({}, state, { busy, success: false });
        }
        return Object.assign({}, state, { busy });
      }
      case FETCH: {
        return state; // catched by Middleware
      }
      case SET_RESULT: {
        const {
          payload
        } = action;
        return Object.assign({}, state, { [resultKey]: payload, success: true });
      }
      case CLEAR_RESULT: {
        return Object.assign({}, state, { [resultKey]: defaultState[resultKey] });
      }
      case SET_ERROR: {
        const { payload } = action;
        const error =
          typeof payload === "string"
            ? payload
            : payload && payload.message
              ? payload.message
              : payload;
        const error_code = payload && payload.code ? payload.code : 0;
        return Object.assign({}, state, { error, error_code, success: false });
      }
      case CLEAR_ERROR: {
        return Object.assign({}, state, { error: undefined });
      }
      case CLEAR_SUCCESS: {
        return Object.assign({}, state, { success: false });
      }
      default:
        return state;
    }
  };
}
