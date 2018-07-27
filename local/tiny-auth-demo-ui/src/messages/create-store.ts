import actionTypes from "./action-types";
import actions from "./actions";
import reducer from "./reducer";
import storeKey from "./store-key";
import selector from "./selector";
/**
 * 
 */
export default function (key: string) {
    return {
        actionTypes: actionTypes(key),
        actions: actions(key),
        reducer: reducer(key),
        storeKey: storeKey(key),
        selector: selector(key)
    }
}