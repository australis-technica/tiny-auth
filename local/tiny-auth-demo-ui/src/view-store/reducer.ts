import { Reducer } from "redux";
import actionTypes from "./action-types";
import persist from "./persist";
import { PersistTransform } from "./persist-transform";
/**
 *
 * @param viewName
 * @param defaultState
 */
export default function(
  viewName: string,
  defaultState = {},
  options?: {
    persistOff?: boolean;
    persistTransform?: PersistTransform;
  }
): Reducer {
  const { SET_STATE } = actionTypes(viewName);
  /** */
  const { persistTransform, persistOff } = options || {
    persistTransform: undefined,
    persistOff: false
  };
  /** */
  const { trySet, tryParse } = persist(viewName, persistTransform);
  const preloaded = persistOff ? defaultState : tryParse(defaultState);
  /**
   *
   */
  return (state = preloaded, action) => {
    switch (action.type) {
      case SET_STATE: {
        const _newSTate = Object.assign({}, state, action.payload);
        !persistOff && trySet(_newSTate);
        return _newSTate;
      }
      default:
        return state;
    }
  };
}
