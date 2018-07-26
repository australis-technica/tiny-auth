import { Component } from "react";
import * as React from "react";
import ListViewItem from "./list-view-item";

const log = process.env.NODE_ENV !== "production" ? console.log.bind(console) : () => { };
log("list-view");
/**
  * 
  */
export default class ListView extends Component<{
  resultKey?: string,
  error: string,
  busy: boolean,
  items: any[],
  fetch?(): any,
  clear?(): any
}> {

  async componentDidMount() {
    this.props.fetch && this.props.fetch();
  }

  render() {
    const { error, busy, items } = this.props;
    return (
      <div style={{ margin: "1rem", display: "flex", flexDirection: "column" }}>
        {error && <span style={{ color: "red" }}>{error}</span>}
        {busy && <span>...busy</span>}
        <span style={{ textTransform: "capitalize" }}>List {name}</span>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          {(items || []).map((item, i) => <ListViewItem key={`list-item-${i}`} value={item} />)}
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <button onClick={this.props.fetch} style={{ maxWidth: "200px" }}>Fetch</button>
          <button onClick={this.props.clear} style={{ maxWidth: "200px" }}>Clear</button>
        </div>
      </div>
    );
  }
}