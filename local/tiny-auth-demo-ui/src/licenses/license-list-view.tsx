import * as React from "react";
import { ComponentType, Fragment, Component } from "react";
import { connect } from "react-redux";
import { licenses } from "../apis";
import { ListView } from "../crud-view";
import { List, ListItem, ListItemText, IconButton, Icon, Menu, MenuItem } from "@material-ui/core";
import { Dispatch } from "redux";
import { Toolbar, Typography } from "@material-ui/core";
/**
 * 
 * @param error 
 */
const renderError = (error: string) => {
  return <span style={{ color: "red" }}>{error}</span>
}
/**
 * 
 */
const renderBusy = () => {
  return <span style={{ color: "blue" }}>Busy</span>
}
/**
 * 
 * @param value 
 * @param index 
 * @param array 
 */
const renderItem = (value: any, index: number, array: any[]) => {
  return <ListItem key={index}>
    <ListItemText >{index} of {array.length}  / {value.displayName}</ListItemText>
  </ListItem>
}
/**
 * 
 * @param items 
 */
const render = (items: any) => {
  return <List >{items}</List>
}
/**
 * 
 * @param state 
 */
const selector = (state: {}) => {
  const s = licenses.selector(state);
  return {
    ...s,
    render,
    renderItem,
    renderBusy,
    renderError
  }
}
/**
 * 
 * @param dispatch 
 */
const bindActions = (dispatch: Dispatch) => {
  return {
    fetch: () => {
      dispatch(licenses.actions.fetch({
        method: "GET",
        resultKey: "items"
      }))
    },
    clear: () => {
      dispatch(licenses.actions.setResult([], {
        resultKey: "items"
      }))
    }
  }
};
/**
 * 
 */
const LicenseListView = connect(selector, bindActions)(ListView) as ComponentType<{}>;
/**
 * 
 */
const ListActions = connect(selector, bindActions)(class extends Component<any> {
  state = {
    isOpen: false
  }
  open = () => this.setState({ isOpen: true });
  close = () => this.setState({ isOpen: false });
  handle = (action: () => any) => {
    return () => {
      this.close();
      action();
    }
  }
  button: any;
  render() {
    const { isOpen } = this.state;
    return <Fragment >
      <IconButton
        buttonRef={x => this.button = x}
        onClick={this.open}
        disabled={this.props.busy}>
        <Icon>more_vert</Icon>
      </IconButton>
      <Menu open={isOpen} anchorEl={this.button} onClose={this.close}>
        <MenuItem onClick={this.handle(this.props.fetch)}><ListItemText children="reload" /></MenuItem>
      </Menu>
    </Fragment>
  }
}) as ComponentType<{}>;
/**
 * 
 */
const ListToolBar = connect(selector, bindActions)(props => {
  return <Toolbar>
    <Typography variant="title">List</Typography>
    <div style={{ flex: "1 0" }} />
    <ListActions />
  </Toolbar>
}) as ComponentType<{}>;
/**
 * 
 */
export default () => {

  return <Fragment>
    <ListToolBar />
    <LicenseListView />
  </Fragment>;
}