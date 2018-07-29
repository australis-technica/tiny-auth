import actionTypes from "./action-types";
import actions from "./actions";
import createPersist from "./persist";
import reducer from "./reducer";
import defaultOptions, { DefaultOptions } from "./default-options";
import { PREFIX } from "./constants";
import actionBinder from "./action-binder";
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
    actions: actions(name),
    actionTypes: actionTypes(name),
    bindActions: actionBinder(name),
    reducer: reducer(name, defaultState, persist),
    selector: (state: {}) => state[storeKey],
    selectAsFormData: (state: {})=> ({ formData: state[storeKey]}),
    storeKey,
  };
}
