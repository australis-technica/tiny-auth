import middleware from "./middleware";
import reducer from "./reducer";
import actions from "./actions";
import { CrudApiOptions, CrudApiState } from "./types";
/**
 *
 * @param endpoint @description api endpoitn and store key suffix
 */
export default function createStore(
  endpoint: string,
  defaultState: CrudApiState,
  options?: CrudApiOptions
) {
  const storeKey = `crud-api-${endpoint}`;
  const _actions = actions(endpoint);
  return {
    storeKey,
    middleware: middleware(endpoint),
    reducer: reducer(endpoint, defaultState, options),
    actions: _actions,
    selector: (state: {}) => state[storeKey]
  };
}
