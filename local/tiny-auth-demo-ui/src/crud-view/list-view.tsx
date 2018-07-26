import { Component, Fragment } from "react";
import * as React from "react";
const log = process.env.NODE_ENV !== "production" ? console.log.bind(console) : () => { };
log("list-view");
/**
  * 
  */
export default class ListView extends Component<{
  error: string;
  busy: boolean;
  items: any[];
  renderItem(value: any, index: number, array: any[]): React.ReactNode;
  render(items: any): React.ReactNode;
  fetch?(): any;
}> {

  async componentDidMount() {
    this.props.fetch && this.props.fetch();
  }

  render() {
    const { error, busy, items } = this.props;
    return (<Fragment>
      {error && <span style={{ color: "red" }}>{error}</span>}
      {busy && <span>...busy</span>}
      {this.props.render((items || []).map(this.props.renderItem))}
    </Fragment>
    );
  }
}