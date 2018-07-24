import * as React from "react";
import { Component } from "react";
import { Tabs, Tab } from "@material-ui/core";
import { CustomersView } from "./customers";
import { ProductsView } from "./products";
import { LicensesView } from "./licenses";
import { RootState } from "./root";
import { connect } from "react-redux";
import { selectors, actions } from "./root";
import { Dispatch } from "redux";
/**
 *
 */
export interface HomeProps extends RootState {}
/**
 *
 */
export default connect(selectors.rawState)(
  /** */
  class Home extends Component<HomeProps & { dispatch: Dispatch }> {
    set = (state: Partial<RootState>) => {
      this.props.dispatch(actions.setState(state));
    };
    setTabIndex = (viewIndex: number) => {
      return () => {
        this.set({ viewIndex });
      };
    };
    /**
     *
     */
    renderTab = (tabIndex: number) => {
      switch (tabIndex) {
        case 0: {
          return <CustomersView />;
        }
        case 1: {
          return <ProductsView />;
        }
        case 2: {
          return <LicensesView />;
        }
        default: {
          return null;
        }
      }
    };
    /**
     *
     */
    render() {
      const { viewIndex } = this.props;
      return (
        <React.Fragment>
          <Tabs title="Tabs" value={viewIndex} fullWidth>
            <Tab
              tabIndex={0}
              title="Customers"
              label="Customers"
              onClick={this.setTabIndex(0)}
            />
            <Tab
              tabIndex={1}
              title="Products"
              label="Products"
              onClick={this.setTabIndex(1)}
            />
            <Tab
              tabIndex={2}
              title="Licenses"
              label="Licenses"
              onClick={this.setTabIndex(2)}
            />
          </Tabs>
          {this.renderTab(viewIndex)}
        </React.Fragment>
      );
    }
  }
);
