import middleware from "./middleware";
import reducer from "./reducer";
import actions from "./actions";
import { Dispatch } from "redux";
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
        selector: (state: {}, props: { dispatch: Dispatch }) => {
            return {
                ...state[storeKey],
                // actions: Object.keys(_actions).reduce((out, actionKey) => {
                //     out[actionKey] = (...payload: any[]) => {
                //         props.dispatch(_actions[actionKey](payload));
                //     }
                //     return out;
                // }, {})
            }
        }
    }
}
