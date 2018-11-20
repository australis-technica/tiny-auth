import * as React from "react";
import { Component } from "react";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
/** */
export default withRouter(
  /** */
  class AuthRequired extends Component<{
    redirectTo: string,
    renderBusy?(state: {}): any;
    busy?: boolean;
    authenticated?: boolean;
  } & RouteComponentProps<{}>> {
    /** */
    render() {
      const { busy, authenticated, renderBusy } = this.props;
      if (busy && renderBusy) {
        const ret = renderBusy(this.props);
        if (ret) return ret;
      }
      if (!authenticated) {
        return <Redirect to={{
          pathname: this.props.redirectTo,
          state: { referrer: this.props.location.pathname }
        }} />;
      }
      return this.props.children;
    }
  });
