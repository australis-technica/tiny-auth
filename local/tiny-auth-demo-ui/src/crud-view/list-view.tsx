import { Component, Fragment, ReactNode } from "react";
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
  renderBusy?(): ReactNode;
  renderError?(error: any): ReactNode;
  renderItem(value: any, index: number, array: any[]): ReactNode;
  render(items: any): ReactNode;
  fetch?(): any;  
}> {

  async componentDidMount() {
    this.props.fetch && this.props.fetch();
  }

  render() {
    const { error, busy, items} = this.props;
    return (<Fragment>
      {error && this.props.renderError && this.props.renderError(error)}
      {busy && this.props.renderBusy && this.props.renderBusy()}      
      {this.props.render((items || []).map(this.props.renderItem))}
    </Fragment>
    );
  }
}