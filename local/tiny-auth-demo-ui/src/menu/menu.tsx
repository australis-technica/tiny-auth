import * as React from "react";
import { Fragment, Component } from "react";
import { Icon, IconButton, Menu } from "@material-ui/core";
/**
 * 
 * @param props 
 */
export default class extends Component<{ openMenu(): any, closeMenu(): any, busy?: boolean, isOpen: boolean }>  {
    menuButton: any;
    render() {
        return (
            <Fragment>
                <IconButton
                    onClick={this.props.openMenu}
                    buttonRef={x => (this.menuButton = x)}
                    disabled={!!this.props.busy}
                >
                    <Icon children="more_vert" />
                </IconButton>
                <Menu
                    open={!!this.props.isOpen}
                    onClose={this.props.closeMenu}
                    anchorEl={this.menuButton}
                >
                    {this.props.children}
                </Menu>
            </Fragment>
        );
    }
}