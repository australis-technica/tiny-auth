import * as React from "react";
import { Component } from "react";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import { AuthState } from "../auth-core";

export type AuthRequiredProps = { redirectTo: string } & AuthState & RouteComponentProps<{}>;

export default withRouter(
  /** */
  class AuthRequired extends Component<AuthRequiredProps> {
    /** */
    render() {
      const { busy, authenticated } = this.props;
      if (busy) {
        return <span>.... please wait </span>
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
