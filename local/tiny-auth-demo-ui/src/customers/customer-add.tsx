import { Component, Fragment } from "react";
import * as React from "react";
import { Card, CardHeader } from "@material-ui/core";
import { connect } from "react-redux";
import adapter from "./store-adapter";
import { createSelector } from "reselect";
/**
 * 
 */
const selector = createSelector(adapter.selector, (state)=>( { view: state}))
/**
 *
 */
const Connected = connect(selector)(
  /**
   *
   */
  class extends Component {
    render() {
      return (
        <Fragment>
          <Card>
            <CardHeader title="Add" />
          </Card>
        </Fragment>
      );
    }
  }
);

export default class CustomerList extends Component<{}> {
  render() {
    return <Connected />;
  }
}
