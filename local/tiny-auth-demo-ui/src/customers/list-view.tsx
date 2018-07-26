import { Component } from "react";
import * as React from "react";
import { connect } from "react-redux";
import { customers } from "../apis";
import { Dispatch } from "redux";
console.log("list-view");

const RESULT_KEY = "customerList";

/* prettier-ignore */
export default (connect(customers.selector)(
  /**
   * 
   */
  class ListView extends Component<{ error: string, busy: boolean, customerList: any[], dispatch: Dispatch }> {

    fetch = () => {
      this.props.dispatch(customers.actions.fetch({
        method: "GET",
        resultKey: RESULT_KEY
      }));
    }
    clear = () => {
      this.props.dispatch(
        customers.actions.setResult([], {
          resultKey: RESULT_KEY,
        })
      )
    }
    async componentDidMount() {
      this.fetch();
    }

    render() {
      const { error, customerList, busy, } = this.props;
      return (
        <div style={{ margin: "1rem", display: "flex", flexDirection: "column" }}>
          {error && <span style={{ color: "red" }}>{error}</span>}
          {busy && <span>...busy</span>}
          <span style={{ textTransform: "capitalize" }}>List {name}</span>
          <pre>{JSON.stringify(customerList, null, 2)}</pre>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <button onClick={this.fetch} style={{ maxWidth: "200px" }}>Fetch</button>
            <button onClick={this.clear} style={{ maxWidth: "200px" }}>Clear</button>
          </div>
        </div>
      );
    }
  }
)
) as React.ComponentType<{}>;