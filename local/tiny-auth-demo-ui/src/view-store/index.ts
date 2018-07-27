import { default as actionTypes } from "./action-types";
import { default as actions } from "./actions";
import { default as persist } from "./persist";
import { default as reducer } from "./reducer";
import { PersistTransform } from "./persist-transform";
/**
 *
 * @param viewName
 */
export default function(
  viewName: string,
  defaultState = {},
  options?: {
    persistOptions?: {
      persistOff?: boolean;
      transform?: PersistTransform;
    };
  }
) {
  const storeKey = `view-store-${viewName}`;
  const { persistOptions } = options || { persistOptions: undefined };
  return {
    storeKey,
    actionTypes: actionTypes(viewName),
    actions: actions(viewName),
    persist: persist(viewName),
    reducer: reducer(viewName, defaultState, persistOptions),
    selector: (state: {}) => state[storeKey]
  };
}
