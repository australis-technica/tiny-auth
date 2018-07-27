import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import { Route, Switch } from "react-router";
import { App } from "./app";
import "./fonts";
import { history, store } from "./store";
import theme from "./theme";
import { Home } from "./home";
import {
  Login,
  Provider as AuthProvider,
  RequireAuth,
  AuthMenu,
  ChangePassword
} from "./auth";
import { ConnectedRouter } from "react-router-redux";
/** */
ReactDOM.render(
  <StoreProvider store={store}>
    <AuthProvider>
      <MuiThemeProvider theme={theme}>
        <App
          history={history}
          toolbarMenu={
            <AuthMenu changePassword={() => history.push("/change-password")} />
          }
        >
          <ConnectedRouter history={history}>
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  return (
                    <RequireAuth
                      redirectTo="/login"
                      renderBusy={() => (
                        <span>.... Auth busy, please wait </span>
                      )}
                    >
                      <Home />
                    </RequireAuth>
                  );
                }}
              />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Login} />
              <Route
                exact
                path="/change-password"
                render={() => (
                  <RequireAuth redirectTo="/login">
                    <ChangePassword />
                  </RequireAuth>
                )}
              />
            </Switch>
          </ConnectedRouter>
        </App>
      </MuiThemeProvider>
    </AuthProvider>
  </StoreProvider>,
  document.getElementById("root") as HTMLElement
);
