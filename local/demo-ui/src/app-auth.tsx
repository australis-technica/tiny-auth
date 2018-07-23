import * as React from "react";
import { connect } from "react-redux";
import createAuthApi from "@australis/tiny-auth-api";
import { AuthHandler } from "./auth-handler";
import { AuthProvider, AuthRequired, withAuth } from "@australis/tiny-auth-react";
import { bindActions, selector } from "@australis/tiny-auth-redux";
import { LoginView } from "./auth-ui";
import { store } from "./store";
import * as endPoints from "./endpoints";
/**
 * 
 */
const authApi = createAuthApi({
    loginUrl: endPoints.LOGIN,
    logoutUrl: endPoints.LOGOUT,
    profileUrl: endPoints.PROFILE,
    refreshUrl: endPoints.REFRESH
});
/** */
const authHandler = AuthHandler(() => selector(store.getState()), bindActions(store), authApi);
/** */
export const Login = () => {    
    const V = withAuth(LoginView);
    return <V image={undefined}/>;
}
/** */
export type RequireAuthProps = { children: React.ReactNode, redirectTo: string };
export const RequireAuth = connect(selector)(
    // ...
    (props: RequireAuthProps) => <AuthRequired {...(props as any)} redirectTo={props.redirectTo} children={props.children} />
);
/** */
export const Provider = (props: { children: React.ReactNode }) => <AuthProvider auth={authHandler} children={props.children} />
/** */
export default authHandler;
