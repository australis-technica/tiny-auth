import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore, Middleware, compose } from "redux";
import { createBrowserHistory } from "history";
import root from "./root";
import * as auth from "@australis/tiny-auth-redux";
import { routerReducer, routerMiddleware } from 'react-router-redux'
/** */
const promiseMiddleware = (require("redux-promise").default) as Middleware;
/**
 * 
 * ((window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__())
 */
const actionContext = {};
const browserHistory = createBrowserHistory();
/** */
export const store = createStore(
    combineReducers({
        [auth.STORE_KEY]: auth.reducer,
        root,
        router: routerReducer
    }),
    applyMiddleware(
        thunk.withExtraArgument(actionContext),
        promiseMiddleware,
        routerMiddleware(browserHistory as any),
    ) as any,
    compose(((window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()))
);

export const history = browserHistory;