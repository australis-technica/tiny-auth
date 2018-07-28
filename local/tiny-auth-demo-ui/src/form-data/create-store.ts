import actionTypes from "./action-types";
import actions from "./actions";
import createPersist from "./persist";
import reducer from "./reducer";
import defaultOptions, { DefaultOptions } from "./default-options";
import { PREFIX } from "./constants";
/**
 *
 * @param name
 */
export default function(
  name: string,
  defaultState = {},
  options?: DefaultOptions
) {
  options = Object.assign({},defaultOptions, options );  
  const storeKey = `${PREFIX}-${name}`
  let persist;
  if (!(options && options.persist && options.persist.off)) {
    persist = createPersist(name);
  }
  return {
    storeKey,
    actionTypes: actionTypes(name),
    actions: actions(name),
    reducer: reducer(name, defaultState, persist),
    selector: (state: {}) => state[storeKey]
  };
}
