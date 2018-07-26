import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import * as React from "react";
import { Component, ComponentType } from "react";
import { connect } from "react-redux";
import adapter from "./adapter";
import styles from "./styles";
import { History } from "history";
/**
 *
 */
interface AppState {
  rootUrl: string;
  title: string;  
}
/** */
export type AppProps = {
  toolbarMenu: React.ReactNode;
  history: History;
};
/** */
class App extends Component<AppProps & AppState & { classes: ClassNameMap }> {
  /** */
  render() {
    const { classes, toolbarMenu, rootUrl, title } = this.props;
    return (
      <div className={classes.app}>
        <AppBar>
          <Toolbar>
            <Typography
              variant="title"
              className={classes.appTitle}
              onClick={e => this.props.history.push(rootUrl)}
              color="inherit"
            >
              {title}
            </Typography>
            <div style={{ flex: "1 0" }} />
            {toolbarMenu}
          </Toolbar>
        </AppBar>
        <div className={classes.content}>{this.props.children}</div>
      </div>
    );
  }
}
/**
 *
 * @param state
 */
const selector = (state: {}) => {
  const s = adapter.selector(state);
  return {
    ...s
  };
};
/** */
export default connect(selector)(withStyles(styles)(App)) as ComponentType<
  AppProps
>;
