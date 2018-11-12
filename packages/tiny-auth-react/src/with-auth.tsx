import * as React from "react";
import { Component, ComponentType } from "react";
const propTypes = require("prop-types");
import { Auth } from "@australis/tiny-auth-core";
/** */
export type AuthProps = { auth: Auth };
/** */
type Without<T, K> = {
    [L in Exclude<keyof T, K>]: T[L]
};
/** */
export default function withAuth<P extends AuthProps>(K: ComponentType<P>) {
    /** */
    return class WithAuth extends Component<Without<P, "auth">>{
        static displayName = `WithAuth(${K.displayName})`;
        static contextTypes = {
            auth: propTypes.any
        }
        render() {
            const { auth } = (this as any).context;
            return <K {...this.props} auth={auth} />
        }
    }
}