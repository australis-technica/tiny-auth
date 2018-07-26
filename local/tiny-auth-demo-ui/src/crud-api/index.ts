import middleware from "./middleware";
import reducer from "./reducer";
import actions from "./actions";
/**
 * 
 * @param endpoint 
 */
export default function (endpoint: string) {
    const storeKey = `crud-api-${endpoint}`;
    const _actions = actions(endpoint);
    return {
        storeKey,
        middleware: middleware(endpoint),
        reducer: reducer(endpoint),
        actions: _actions,
        selector: (state: {}) => state[storeKey]
    }
}
