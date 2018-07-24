import { Component } from "react";
import { IconButton, Icon, Menu, MenuItem, ListItemText } from "@material-ui/core";
import * as React from "react";
import { Auth } from "@australis/tiny-auth-core";
/**
 * 
 */
interface AuthMenuState {
    isOpen: boolean;
}
export interface AuthMenuProps {
    auth: Auth;
    onChangePasswordClick?(): any;
}
/**
 * 
 */
export default class AuthMenu extends Component<AuthMenuProps> {
    /** */
    state: AuthMenuState = {
        isOpen: false
    }
    /** */
    onLogoutClick = () => {
        this.props.auth.logout();
    }
    /** */
    onChangePasswordClick = () => {
        this.props.onChangePasswordClick && this.props.onChangePasswordClick();
    }
    /** */
    onMenuIconClick = () => {
        this.setState({ isOpen: true });
    }
    /** */
    onMenuClose = () => {
        this.setState({ isOpen: false });
    }
    /**
     * 
     */
    anchorEl: HTMLElement;
    render() {
        const { isOpen } = this.state;
        return (<React.Fragment>
            <IconButton color="inherit" onClick={this.onMenuIconClick} buttonRef={x => this.anchorEl = x}>
                <Icon children="person" />
            </IconButton>
            <Menu open={isOpen} onClose={this.onMenuClose} anchorEl={this.anchorEl}>
                <MenuItem onClick={this.onChangePasswordClick} >
                    <ListItemText >Change Password</ListItemText>
                </MenuItem>
                <MenuItem onClick={this.onLogoutClick} >
                    <ListItemText >Logout</ListItemText>
                </MenuItem>
            </Menu>
        </React.Fragment>)
    }
}