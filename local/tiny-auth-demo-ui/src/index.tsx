import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import { Route, Switch } from 'react-router';
import App from "./app";
import "./fonts";
import { history, store } from "./store";
import theme from "./theme";
import Home from "./app-home";
import { Login, Provider as AuthProvider, RequireAuth, AuthMenu, ChangePassword } from "./app-auth"
import { ConnectedRouter } from "react-router-redux";
import toolbarTitle from "./app-toolbar-title";
/** */
ReactDOM.render(
  <StoreProvider store={store}>
    <AuthProvider >
      <MuiThemeProvider theme={theme}>
        <App toolBarTitle={toolbarTitle} toolbarMenu={<AuthMenu changePassword={() => history.push("/change-password")} />}>
          <ConnectedRouter history={history} >
            <Switch >
              <Route exact path="/" render={() => <RequireAuth redirectTo="/login" children={<Home />} />} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Login} />
              <Route exact path="/change-password" render={() => <RequireAuth redirectTo="/login"><ChangePassword /></RequireAuth>} />
            </Switch>
          </ConnectedRouter></App>
      </MuiThemeProvider>
    </AuthProvider>
  </StoreProvider>,
  document.getElementById("root") as HTMLElement
);
