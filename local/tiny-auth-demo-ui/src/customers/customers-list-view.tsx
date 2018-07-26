import * as React from "react";
import { ComponentType } from "react";
import { connect } from "react-redux";
import { customers } from "../apis";
import { ListView } from "../crud-view";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Dispatch } from "redux";
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
    renderItem
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
      dispatch(customers.actions.setResult([], {
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
export default LicenseListView;