import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import { Route, Router, Switch } from 'react-router';
import App from "./app";
import "./fonts";
import { history, store } from "./store";
import theme from "./theme";
import Home from "./app-home";
import { Login, Provider as AuthProvider, RequireAuth , AuthMenu } from "./app-auth"
import WithLocation from "./with-location";
/** */
ReactDOM.render(
  <StoreProvider store={store}>
      <AuthProvider >
        <MuiThemeProvider theme={theme}>
          <App rootUrl="/" toolbarMenu={<AuthMenu />}>
            <Router history={history as any} >
              <WithLocation render={(location) =>
                <Switch location={location}>
                  <Route exact path="/" location={location} render={() => <RequireAuth redirectTo="/login" children={<Home />} />} />
                  <Route exact path="/login" location={location} component={Login} />
                  <Route exact path="/logout" location={location} component={Login} />
                </Switch>
              } />
            </Router></App>
        </MuiThemeProvider>
      </AuthProvider>
  </StoreProvider>,
  document.getElementById("root") as HTMLElement
);
