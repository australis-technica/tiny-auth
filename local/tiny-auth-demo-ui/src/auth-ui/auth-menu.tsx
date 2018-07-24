import { Component } from "react";
import { IconButton, Icon, Menu, MenuItem, ListItemText } from "@material-ui/core";
import * as React from "react";
import { Auth, AuthState } from "@australis/tiny-auth-core";
/**
 * 
 */
interface AuthMenuState {
    isOpen: boolean;
}
export interface AuthMenuProps {
    auth: Auth;
    authState: AuthState;
    onChangePasswordClick?(): any;
}
/**
 * 
 */
export default class AuthMenu extends Component<AuthMenuProps> {
    /** */
    state: Partial<AuthState> & AuthMenuState = {
        isOpen: false
    }
    /** */
    static getDerivedStateFromProps(props: AuthMenuProps, state: Partial<AuthState> & AuthMenuState) {
        return Object.assign(state, props.authState);
    }
    /** */
    close = () => {
        this.setState({ isOpen: false });
    };
    /** */
    onLogoutClick = () => {
        this.close();
        this.props.auth.logout();
    }
    /** */
    onChangePasswordClick = () => {
        this.close();
        this.props.onChangePasswordClick && this.props.onChangePasswordClick();
    }
    /** */
    onMenuIconClick = () => {
        this.setState({ isOpen: true });
    }
    /** */
    onMenuClose = () => {
        this.close();
    }
    /**
     * 
     */
    anchorEl: HTMLElement;
    render() {
        const { isOpen, authenticated, busy } = this.state;
        if (busy) { return null; }
        if (!authenticated) return null;
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