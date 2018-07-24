import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { Component, ComponentType } from "react";
import { connect } from "react-redux";
import { RootState, selectors } from "./root";
import styles from "./styles";
import { Dispatch } from "redux";
import { push } from "react-router-redux";
/** */
export type AppProps = {
  rootUrl: string,
  toolbarMenu: React.ReactNode
};
/** */
const App: ComponentType<AppProps> = connect(selectors.rawState)(
  /** */
  withStyles(styles)(
    /** */
    class App extends Component<AppProps & { classes: ClassNameMap, dispatch: Dispatch } & RootState> {
      /** */
      render() {
        const { classes, toolbarMenu, ...rootState } = this.props;
        const { title } = rootState;
        return (
          <div className={classes.app}>
            <AppBar>
              <Toolbar>
                <Typography variant="title" className={classes.appTitle} onClick={e => {
                  this.props.dispatch(push(this.props.rootUrl))
                }}>{title}</Typography>
                <div style={{ flex: "1 0" }} />
                {toolbarMenu}
              </Toolbar>
            </AppBar>
            <div className={classes.content}>{this.props.children}</div>
          </div>
        );
      }
    }
  ))
/** */
export default App;
