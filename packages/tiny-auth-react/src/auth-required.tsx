import * as React from "react";
import { Component } from "react";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import { AuthState } from "@australis/tiny-auth-core";

export type AuthRequiredProps = { redirectTo: string, renderBusy?(state: AuthState): any } & AuthState & RouteComponentProps<{}>;

export default withRouter(
  /** */
  class AuthRequired extends Component<AuthRequiredProps> {
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
