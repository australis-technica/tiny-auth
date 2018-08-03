import * as React from "react";
import { Fragment, Component, ReactNode } from "react";
import { Icon, IconButton, Menu } from "@material-ui/core";
/**
 * 
 * @param props 
 */
export default class QuickMenu extends Component<{
    onRequestOpen(): any,
    onClose?(): any,
    disabled?: boolean,
    isOpen: boolean,
    menuIcon?: ReactNode
}>  {
    menuButton: any;
    render() {
        const menuIcon = this.props.menuIcon || "more_vert";
        return (
            <Fragment>
                <IconButton
                    onClick={this.props.onRequestOpen}
                    buttonRef={x => (this.menuButton = x)}
                    disabled={!!this.props.disabled}
                >
                    {typeof menuIcon === "string" ? <Icon children={menuIcon} /> : menuIcon}
                </IconButton>
                <Menu
                    open={!!this.props.isOpen}
                    onClose={this.props.onClose}
                    anchorEl={this.menuButton}                    
                >
                    {this.props.children}
                </Menu>
            </Fragment>
        );
    }
}