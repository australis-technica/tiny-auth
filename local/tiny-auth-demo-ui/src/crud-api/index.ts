import middleware from "./middleware";
import reducer from "./reducer";
import actions from "./actions";
/**
 * 
 * @param endpoint 
 */
export default function (endpoint: string, defaultState: {}) {
    const storeKey = `crud-api-${endpoint}`;
    const _actions = actions(endpoint);
    return {
        storeKey,
        middleware: middleware(endpoint),
        reducer: reducer(endpoint, defaultState),
        actions: _actions,
        selector: (state: {}) => state[storeKey]
    }
}
