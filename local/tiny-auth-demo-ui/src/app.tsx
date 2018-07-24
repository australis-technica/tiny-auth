import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import * as React from "react";
import { Component, ComponentType } from "react";
import { connect } from "react-redux";
import { RootState, selectors } from "./root";
import styles from "./styles";
import { Dispatch } from "redux";
/** */
export type AppProps = {  
  toolbarMenu: React.ReactNode,
  toolBarTitle: (p: AppProps & RootState & { classes: ClassNameMap, dispatch: Dispatch }  ) => any;
};
/** */
const App: ComponentType<AppProps> = connect(selectors.rawState)(
  /** */
  withStyles(styles)(
    /** */
    class App extends Component<AppProps & { classes: ClassNameMap, dispatch: Dispatch } & RootState> {
      /** */
      render() {
        const { classes, toolbarMenu } = this.props;
        return (
          <div className={classes.app}>
            <AppBar>
              <Toolbar>
                {this.props.toolBarTitle(this.props)}
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
