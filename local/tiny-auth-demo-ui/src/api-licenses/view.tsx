import { Component, Fragment } from "react";
import { Tabs, Tab } from "@material-ui/core";
import * as React from "react";
import List from "./list";
import LicenseAdd from "./license-add";

export default class CustomersView extends Component<{}>{
  /** */
  state = {
    tabIndex: 0
  }
  setTabIndex = (tabIndex: number) => {
    return () => this.setState({ tabIndex });
  }
  /**
   * 
   */
  content = (tabIndex: number) => {
    switch (tabIndex) {
      case 0: {
        return <List />
      }
      case 1: {
        return <LicenseAdd />
      }
      default: {
        return null;
      }
    }
  }
  /** */
  render() {
    const { tabIndex } = this.state;
    return <Fragment>
      <Tabs value={tabIndex} fullWidth={true}>
        <Tab value={0} label={"List"} onClick={this.setTabIndex(0)} />
        <Tab value={1} label={"Add"} onClick={this.setTabIndex(1)} />
      </Tabs>
      {this.content(tabIndex)}
    </Fragment>
  }
}