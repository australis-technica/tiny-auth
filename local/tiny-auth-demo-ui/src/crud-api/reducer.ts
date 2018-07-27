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
        return Object.assign({}, state, { busy: payload });
      }
      case FETCH: {
        // const { payload } = action;
        // return Object.assign({}, state, { busy: payload });
        return state;
      }
      case RESULT: {
        const {
          payload
          // meta
        } = action;
        // TODO: set Different results?
        // const key = meta && meta.resultKey ? meta.resultKey : "data";
        return Object.assign({}, state, { [resultKey]: payload });
      }
      case ERROR: {
        const { payload } = action;
        const error =
          typeof payload === "string"
            ? payload
            : payload && payload.message
              ? payload.message
              : payload;
        return Object.assign({}, state, { error });
      }
      default:
        return state;
    }
  };
}
