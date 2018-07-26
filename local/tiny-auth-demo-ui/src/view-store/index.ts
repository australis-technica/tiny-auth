import { default as actionTypes } from "./action-types";
import { default as actions } from "./actions";
import { default as persist } from "./persist";
import { default as reducer } from "./reducer";
/**
 * 
 * @param viewName 
 */
export default function(viewName: string) {
  const storeKey = `view-store-${viewName}`;
  return {
    storeKey,
    actionTypes: actionTypes(viewName),
    actions: actions(viewName),
    persist: persist(viewName),
    reducer: reducer(viewName),
    selector: (state: {})=> state[storeKey]
  };
}
