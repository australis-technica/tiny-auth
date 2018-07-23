import * as React from "react";
const propTypes = require("prop-types");
import { Auth } from "@australis/tiny-auth-core";
import { Component } from "react";
/** */
export default class AuthProvider extends Component<{ auth: Auth }>{
    static childContextTypes = {
        auth: propTypes.any
    }
    getChildContext() {
        return {
            auth: this.props.auth
        }
    }
    render() {
        return React.Children.only(this.props.children)
    }
}