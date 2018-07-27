import { Component, Fragment } from "react";
import { Tabs, Tab } from "@material-ui/core";
import * as React from "react";
import CustomerAdd from "./customer-add";
import ConstomerListView from "./customers-list-view";
import { connect } from "react-redux";
import { CustomersViewState, customersViewState} from "./store-adapter";
import { Dispatch } from "redux";
import withStyles, {
  ClassNameMap,
  StyleRulesCallback
} from "@material-ui/core/styles/withStyles";
/**
 * 
 */
interface ViewActions {
  setState(payload: Partial<CustomersViewState>): any;
}
/**
 *
 */
const styles: StyleRulesCallback = theme => ({
  tabs: {
    flex: "1 0",
    width: "100%"
  }
});
/**
 * parameters
 */
interface ViewProps {
  // ...
}
/**
 *
 */
class CustomersView extends Component<
  ViewProps & CustomersViewState & ViewActions & { classes: ClassNameMap }
> {
  /** */

  setTabIndex = (tabIndex: number) => {
    return () => this.props.setState({ tabIndex });
  };
  /**
   *
   */
  content = (tabIndex: number) => {
    switch (tabIndex) {
      case 0: {
        return <ConstomerListView />;
      }
      case 1: {
        return <CustomerAdd />;
      }
      default: {
        return null;
      }
    }
  };
  /** */
  render() {
    const { tabIndex, classes } = this.props;
    return (
      <Fragment>
        <Tabs
          value={tabIndex}
          fullWidth={true}
          centered={true}
          className={classes.tabs}
        >
          <Tab value={0} label={"List"} onClick={this.setTabIndex(0)} />
          <Tab value={1} label={"Add"} onClick={this.setTabIndex(1)} />
        </Tabs>
        {this.content(tabIndex)}
      </Fragment>
    );
  }
}
/**
 *
 * @param state
 */
const selector = (state: {}) => {
  const s: CustomersViewState = customersViewState.selector(state);
  s.tabIndex = s.tabIndex || 0;
  return {
    ...s
  };
};
/**
 *
 * @param dispatch
 * @param props
 */
const bindActions = (dispatch: Dispatch, _props: CustomersViewState) => {
  return {
    setState: (payload: Partial<ViewActions>) => {
      dispatch(customersViewState.actions.setState(payload));
    }
  };
};
/**
 *
 */
export default connect(
  selector,
  bindActions
)(withStyles(styles)(CustomersView)) as React.ComponentType<ViewProps>;
