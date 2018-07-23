import { join } from "path";
import { createStore, combineReducers } from "redux";
import * as src from "../src";
import { defaultState } from "../src/constants";
/**
 * 
 */
const store = createStore(
    combineReducers({
        [src.STORE_KEY]: src.reducer
    })
)
/**
 * 
 */
describe(require(join(__dirname, "../package.json")).name, ()=> {
    it("works", ()=> {
        expect(src.selector(store.getState())).toMatchObject(defaultState);
        store.dispatch(src.actions.setError("x-error"));
        expect(src.selector(store.getState()).error).toBe("x-error");        
    })
});