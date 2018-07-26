import { Component, Fragment } from "react";
import { Tabs, Tab } from "@material-ui/core";
import * as React from "react";
import CustomerAdd from "./customer-add";
import ConstomerListView from "./customers-list-view";
import { connect } from "react-redux";
import adapter from "./store-adapter";
import { Dispatch } from "redux";
/**
 *
 */
interface CustomersViewProps {
  tabIndex: number;
  setState(payload: Partial<CustomersViewProps>): any;
}
/**
 *
 */
class CustomersView extends Component<CustomersViewProps> {
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
    const { tabIndex } = this.props;
    return (
      <Fragment>
        <Tabs value={tabIndex} fullWidth={true}>
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
  const s: CustomersViewProps = adapter.selector(state);
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
const bindActions = (dispatch: Dispatch, _props: CustomersViewProps) => {
  return {
    setState: (payload: Partial<CustomersViewProps>) => {
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
)(CustomersView) as React.ComponentType<{}>;
