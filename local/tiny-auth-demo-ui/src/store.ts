import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore, Middleware, compose } from "redux";
import { createBrowserHistory } from "history";
import root from "./root";
import * as auth from "@australis/tiny-auth-redux";
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { customers, products, licenses } from "./apis";
/** */
const promiseMiddleware = (require("redux-promise").default) as Middleware;

const actionContext = {};
const browserHistory = createBrowserHistory();
/**
 * dev-tools
 */
const composeEnhancers = process.env.NODE_ENV === "production" ? compose :
    typeof window === 'object' &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

/** */
export const store = createStore(
    combineReducers({
        [auth.STORE_KEY]: auth.reducer,
        root,
        router: routerReducer,
        [customers.storeKey]: customers.reducer,
        [products.storeKey]: products.reducer,
        [licenses.storeKey]: licenses.reducer
    }),
    composeEnhancers(
        applyMiddleware(
            thunk.withExtraArgument(actionContext),
            promiseMiddleware,
            routerMiddleware(browserHistory as any),
            customers.middleware,
            products.middleware,
            licenses.middleware
        ) as any
    )
);
/**
 * 
 */
export const history = browserHistory;