import { Reducer } from "redux";
import actionTypes from "./action-types";
import persist from "./persist";
/**
 * 
 * @param viewName 
 * @param defaultState 
 */
export default function (viewName: string, defaultState = {}): Reducer{
    const { SET_STATE } = actionTypes(viewName);
    const { trySet, tryParse } = persist(viewName);
    const preloaded = tryParse(defaultState);
    /**
     * 
     */
    return (state = preloaded, action )=>{
        switch (action.type) {
            case SET_STATE: {
              const _newSTate = Object.assign({}, state, action.payload);
              trySet(_newSTate);
              return _newSTate;
            }
            default:
              return state;
          }
    }
}