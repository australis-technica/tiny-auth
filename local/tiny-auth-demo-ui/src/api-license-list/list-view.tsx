import {
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";
import withStyles, { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component, ComponentType } from "react";
import { ApiActions, ApiItem, ApiState } from "./api";
import ListViewItem, { ActionType } from "./list-view-item";
import styles from "./list-view-styles";
import { Connected as Deliver } from "../api-license-deliver";
export interface ListViewParams {}

export type ApiContext = {
  apiState: ApiState;
  api: ApiActions;
};

export type ListViewProps = ApiContext & ListViewParams;
/** private */
interface ListViewState {
  actionType: ActionType | undefined;
  item: ApiItem | undefined;
  filterText: string | undefined;
}

/** */
class ListView extends Component<ListViewProps & { classes: ClassNameMap }> {
  /** */
  state: ListViewState = {
    actionType: undefined,
    item: undefined,
    filterText: ""
  };
  /** */
  clearActionType = () => {
    this.setState({ actionType: undefined });
  };
  /** */
  setActionType = (actionType: ActionType) => {
    return () => {
      this.setState({ actionType });
    };
  };
  componentDidMount() {
    this.props.api.fetch({
      method: "GET"
    });
  }
  renderError = (error: string) => {
    return <span style={{ color: "red" }}>{error}</span>;
  };
  renderBusy = () => {
    return <span style={{ color: "blue" }}>Busy</span>;
  };

  filter = (regex: RegExp) => {
    return (x: {}) => {
      return regex.test(
        Object.keys(x)
          .map(k => `${x[k]}`)
          .join(" ")
      );
    };
  };
  render() {
    const { busy, error, data } = this.props.apiState;
    const { classes } = this.props;
    const { filterText, item } = this.state;
    const filtered = (data || []).filter(
      this.filter(new RegExp(filterText || ""))
    );
    if (busy) return this.renderBusy();
    if (error) return this.renderError(error);
    if (!data) return null;
    if (!Array.isArray(data)) {
      return this.renderError("Wrong Data type");
    }
    return (
      <div className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="title" className={classes.toolbarTitle}>
            List
          </Typography>
          <TextField
            className={classes.searchField}
            fullWidth
            value={filterText}
            onChange={e => this.setState({ filterText: e.target.value })}
            InputProps={{
              startAdornment: <Icon children={"search"} />,
              endAdornment: <Icon children={"clear"} />
            }}
          />
          <div style={{ flex: "1 0" }} />
          <IconButton>
            <Icon>more_vert</Icon>
          </IconButton>
        </Toolbar>
        <List>
          {!filtered ||
            (!filtered.length && (
              <ListItem children={<ListItemText>Not Found</ListItemText>} />
            ))}
          {filtered.map((item, i) => (
            <ListViewItem
              key={`list_item_${i}`}
              item={item}
              onRequestAction={(actionType, item) => {
                this.setState({ actionType, item });
              }}
            />
          ))}
        </List>
        <Deliver
          onClose={() => {
            this.setState({ actionType: undefined, item: undefined });
          }}
          isOpen={this.state.actionType === "deliver"}
          item={item}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ListView) as ComponentType<ListViewParams>;
