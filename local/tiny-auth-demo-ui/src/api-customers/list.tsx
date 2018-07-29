import { List, ListItem, ListItemText } from "@material-ui/core";
import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { customers as adapter } from "../apis";
import { CrudApiState } from "../crud-api";

const selector = createSelector(adapter.selector, apiState => apiState);

class View extends Component<CrudApiState> {
  renderError = (error: string) => {
    return <span style={{ color: "red" }}>{error}</span>;
  };
  renderBusy = () => {
    return <span style={{ color: "blue" }}>Busy</span>;
  };
  rendeItems(items: any[]) {
    return items.map((value, index, array) => {});
  }
  toFields = (item: {}) => {
    return Object.keys(item)
      .map(key => `${key}=${item[key]}`)
      .join(",");
  };
  renderProps() {
    return null;
  }
  render() {
    const { busy, error, data } = this.props;
    if (busy) return this.renderBusy();
    if (error) return this.renderError(error);
    if (!data) return null;
    if(!Array.isArray(data)) {
      return this.renderError("Wrong Data type");
    }
    return (
      <List>
        {data.map(this.toFields).map(text => (
          <ListItem>
            <ListItemText>{text}</ListItemText>
          </ListItem>
        ))}
      </List>
    );
  }
}
const Connected = connect(
  selector,
  adapter.bindActions
)(View);
/**
 *
 */
export default Connected;
