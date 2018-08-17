import * as React from "react";
import { connect } from "react-redux";
import createAuthApi from "@australis/tiny-auth-api";
import { AuthHandler } from "@australis/tiny-auth-handler";
import { AuthProvider, AuthRequired, AuthRequiredProps, withAuth } from "@australis/tiny-auth-react";
import { bindActions, selector } from "@australis/tiny-auth-redux";
import { LoginView, AuthMenu as authMenu, ChangePassword as changePassword } from "./auth-ui";
import { store } from "./store";
import * as endPoints from "./endpoints";
/**
 * 
 */
const authApi = createAuthApi({
    loginUrl: endPoints.LOGIN,
    logoutUrl: endPoints.LOGOUT,
    profileUrl: endPoints.PROFILE,
    refreshUrl: endPoints.REFRESH,
    changePasswordUrl: endPoints.CHANGEPASSWORD
}, {
    getToken: ()=> {
        const authState = selector(store.getState());
        const token = authState.token;
        console.log(token);
        return token;
    }
});
/** */
const authHandler = AuthHandler(() => selector(store.getState()), bindActions(store), authApi);
/** */
export const Login = () => {
    const V = withAuth(LoginView);
    return <V image={undefined} />;
}
/** */
export const AuthMenu = connect(state => ({ authState: selector(state) }))(withAuth(authMenu));
/** */
export const ChangePassword = () => {
    const V = connect(state => ({ authState: selector(state) }))(withAuth(changePassword));
    return <V image={undefined} api={authApi} />
}
/** */
export const RequireAuth: React.ComponentType<Partial<AuthRequiredProps>> = connect(selector)(AuthRequired);
/** */
export const Provider = (props: { children: React.ReactNode }) => <AuthProvider auth={authHandler} children={props.children} />
/** */
export default authHandler;
