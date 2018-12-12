import * as React from "react";
import { ComponentType } from "react";
const propTypes = require("prop-types");
/** */
export default function withAuth<P extends { [key: string]: any }>(K: ComponentType<P>) {
    /** */
    return class WithAuth extends React.Component<{ [key: string]: any } & P>{
        /** */
        static displayName = `WithAuth(${K.displayName})`;
        /** */
        static contextTypes = {
            auth: propTypes.any
        }
        /** */
        render() {
            const { auth: _auth, ...props } = this.props as { [key: string]: any };
            const { auth } = (this as any).context;
            return <K {...Object.assign(props, { auth: _auth || auth }) as any} />
        }
    }
}