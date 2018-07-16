import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore, Middleware, compose } from "redux";
import createHistory from "history/createBrowserHistory";
import root from "./root";
import * as auth from "./auth-redux";
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { routerMiddleware } from "react-router-redux";
/** */
const promiseMiddleware = (require("redux-promise").default) as Middleware;
/**
 * 
 * ((window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__())
 */
const actionContext = {};
const browserHistory = createHistory();
/** */
export const store = createStore(
    combineReducers({
        [auth.STORE_KEY]: auth.reducer,
        root,
        routing: routerReducer
    }),
    applyMiddleware(
        thunk.withExtraArgument(actionContext),
        promiseMiddleware,
        routerMiddleware(browserHistory as any),    
    ) as any,
    compose(((window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()))
);
// Create an enhanced history that syncs navigation events with the store
export const history = syncHistoryWithStore(browserHistory as any, store);
