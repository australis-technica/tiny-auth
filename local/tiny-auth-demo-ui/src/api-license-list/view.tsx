import { List, ListItem, ListItemText } from "@material-ui/core";
import * as React from "react";
import { Component } from "react";
import { ApiState, ApiActions } from "./api";

export interface ListViewParams {

}

export type ApiContext = {
  apiState: ApiState,
  api: ApiActions
}

export type ListViewProps = ApiContext & ListViewParams;

export default class ListView extends Component<ListViewProps> {
  componentDidMount() {
    this.props.api.fetch({
      method: "GET"
    })
  }
  renderError = (error: string) => {
    return <span style={{ color: "red" }}>{error}</span>;
  };
  renderBusy = () => {
    return <span style={{ color: "blue" }}>Busy</span>;
  };
  renderItems(items: any[]) {
    return items.map((value, index, array) => { });
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
    const { busy, error, data } = this.props.apiState;
    if (busy) return this.renderBusy();
    if (error) return this.renderError(error);
    if (!data) return null;
    if (!Array.isArray(data)) {
      return this.renderError("Wrong Data type");
    }
    return (
      <List>
        {(data || []).map((item, i) => (
          <ListItem key={`list_item_${i}`}>
            <ListItemText>{item.displayName}</ListItemText>
          </ListItem>
        ))}
      </List>
    );
  }
}

