import * as React from "react";
import { ComponentType } from "react";
import { connect } from "react-redux";
import { customers } from "../apis";
import { DataView } from "../crud-view";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Dispatch } from "redux";
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
    <ListItemText >{index} of {array.length}  / DisplayName: {value.displayName} / Enabled: {value.enabled.toString()}</ListItemText>
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
  const s = customers.selector(state);
  return {
    ...s,
    render,
    renderItem,
    renderError,
    renderBusy
  }
}
/**
 * 
 * @param dispatch 
 */
const bindActions = (dispatch: Dispatch) => {
  return {
    fetch: () => {
      dispatch(customers.actions.fetch({
        method: "GET",
        resultKey: "items"
      }))
    },
    clear: () => {
      dispatch(customers.actions.setResult([]))
    }
  }
};
/**
 * 
 */
const LicenseListView = connect(selector, bindActions)(DataView) as ComponentType<{}>;
/**
 * 
 */
export default LicenseListView;