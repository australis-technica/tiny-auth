import middleware from "./middleware";
import reducer from "./reducer";
import actions from "./actions";
import { CrudApiOptions, CrudApiState } from "./types";
import actionBinder from "./action-binder";
import resolveEndPoint from "./resolve-endpoint";
/**
 *
 * @param storeKey @description api endpoitn and store key suffix
 */
export default function createStore(
  sufix: string,
  defaultState: CrudApiState,
  options?: Partial<CrudApiOptions>
) {
  const prefix = options && options.prefix ? options.prefix : "crud-api";
  const storeKey = `${prefix}/${sufix}`;
  const _actions = actions(storeKey);
  const endPoint = options && options.endpoint ? options.endpoint : resolveEndPoint(storeKey);
  return {
    bindActions: actionBinder(storeKey),
    storeKey,
    endPoint,
    middleware: middleware(storeKey, endPoint),
    reducer: reducer(storeKey, defaultState, options),
    actions: _actions,
    selector: (state: {}) => state[storeKey]
  };
}
