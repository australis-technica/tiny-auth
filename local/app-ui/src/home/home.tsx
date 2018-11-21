import { StyleRulesCallback, withStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import adapter from "./adapter";
/**
 *
 */
interface HomeState {
  tabIndex: number;
}
/**
 *
 */
export interface HomeProps {}
/**
 *
 */
interface HomeActions {
  setState(payload: Partial<HomeState>): any;
}
/** */
const styles: StyleRulesCallback = theme => ({
  tabs: {
    flex: "1 0",
    width: "100%"
  }
});
/**
 *
 */
/** */
class Home extends Component<
  HomeProps & HomeState & HomeActions & { classes: ClassNameMap }
> {
  /**
   *
   */
  set = (state: Partial<HomeProps>) => {
    this.props.setState(state);
  };
  /**
   *
   */
  setTabIndex = (tabIndex: number) => {
    return () => {
      this.set({ tabIndex });
    };
  };
  
  /**
   *
   */
  render() {    
    return (
      <React.Fragment>
        <div> Hello</div>
      </React.Fragment>
    );
  }
}
/**
 *
 */
const selector = (state: {}) => {
  return adapter.selector(state);
};
/**
 *
 */
const bindActions = (dispatch: Dispatch) => {
  return {
    setState: (payload: Partial<HomeState>) => {
      dispatch(adapter.actions.setState(payload));
    }
  };
};
/**
 *
 */
export default connect(
  selector,
  bindActions
)(withStyles(styles)(Home)) as React.ComponentType;
