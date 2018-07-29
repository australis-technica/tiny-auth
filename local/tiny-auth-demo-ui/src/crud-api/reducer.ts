import { Reducer, AnyAction } from "redux";
import actionTypes from "./action-types";
import { CrudApiOptions, CrudApiState } from "./types";
import defaultOptions from "./default-options";
/**
 *
 * @param endpoint
 */
export default function(
  endpoint: string,
  defaultState: CrudApiState,
  options: Partial<CrudApiOptions> = defaultOptions
): Reducer {
  const { BUSY, ERROR, FETCH, RESULT } = actionTypes(endpoint);
  const o: CrudApiOptions = Object.assign({}, defaultOptions, options);
  const { resultKey } = o;
  /**
   *
   */
  return (state: CrudApiState = defaultState, action: AnyAction) => {
    switch (action.type) {
      case BUSY: {
        const { payload } = action;
        const busy = !!payload;
        if(busy){
          return Object.assign({}, state, { busy, success: false });  
        }
        return Object.assign({}, state, { busy });
      }
      case FETCH: {
        return state; // catched by Middleware
      }
      case RESULT: {
        const {
          payload
        } = action;
        return Object.assign({}, state, { [resultKey]: payload, success: true });
      }
      case ERROR: {
        const { payload } = action;
        const error =
          typeof payload === "string"
            ? payload
            : payload && payload.message
              ? payload.message
              : payload;
        return Object.assign({}, state, { error, success: false });
      }
      default:
        return state;
    }
  };
}
