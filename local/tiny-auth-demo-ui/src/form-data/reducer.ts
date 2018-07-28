import { Reducer } from "redux";
import actionTypes from "./action-types";
import { Persist } from "./persist";
/**
 *
 * @param viewName
 * @param defaultState
 */
export default function(
  viewName: string,
  defaultState = {},
  persist?: Persist
): Reducer {
    
  const { SET_STATE } = actionTypes(viewName);      
  const preloaded = !persist ? defaultState : persist.tryParse(defaultState);
  /**
   *
   */
  return (state = preloaded, action) => {
    switch (action.type) {
      case SET_STATE: {
        const _newSTate = Object.assign({}, state, action.payload);
        persist && persist.trySet(_newSTate);
        return _newSTate;
      }
      default:
        return state;
    }
  };
}
