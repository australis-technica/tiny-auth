import { Component } from "react";
import { WithMenuState, QuickMenu } from "../menu";
import * as React from "react";
import MenuItem from "@material-ui/core/MenuItem";
export default class PageSizeMenu extends Component<{
    pageSizes: number[];
    setPageSize(n: number): any;
}> {
    /** */
    setPageSize = (n: number) => {
        return () => this.props.setPageSize(n);
    }
    /** */
    render() {
        return <WithMenuState render={(props) => {
            return <QuickMenu
                menuIcon="menu"
                openMenu={props.openMenu} closeMenu={props.closeMenu}
                isOpen={props.isOpen}>
                {this.props.pageSizes.map((n, i) => (
                    <MenuItem
                        key={`x_${i}`}
                        onClick={props.handleMenuAction(this.setPageSize(n))}>{n}</MenuItem>))}
            </QuickMenu>
        }} />
    }
}