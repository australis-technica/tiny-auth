import actionTypes from "./action-types";
import actions from "./actions";
import createPersist from "./persist";
import reducer from "./reducer";
import defaultOptions, { DefaultOptions } from "./default-options";
import { PREFIX } from "./constants";
import actionBinder from "./action-binder";
import { FormData } from "./types";
/**
 *
 * @param name
 */
export default function createStore<T extends FormData>(name: string, defaultState: T, options?: DefaultOptions) {
  options = Object.assign({}, defaultOptions, options);
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
    selectAsFormData: (state: {}) => ({ formData: state[storeKey] }),
    storeKey,
  };
}
