import {
  CircularProgress,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar
} from "@material-ui/core";
import withStyles, { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component, ComponentType } from "react";
import { Connected as Deliver } from "../api-license-deliver";
import { TextFilter, WithTextFilter } from "../text-filter";
import { ApiActions, ApiItem, ApiState } from "./api";
import ListViewItem, { ActionType } from "./list-view-item";
import styles from "./list-view-styles";
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
}

/** */
class ListView extends Component<ListViewProps & { classes: ClassNameMap }> {
  /** */
  state: ListViewState = {
    actionType: undefined,
    item: undefined
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
  /** */
  onFilterChanged = (filtered: ApiItem[]) => {
    this.setState({ filtered });
  };
  /** */
  render() {
    const { busy, error, data } = this.props.apiState;
    const { classes } = this.props;
    const { item } = this.state;
    if (error) return this.renderError(error);
    if (!data) return null;
    if (!Array.isArray(data)) {
      return this.renderError("Wrong Data type");
    }
    return (
      <div className={classes.root}>
        <WithTextFilter
          data={data}
          render={(filterValue, filtered, setFilter) => {
            return (
              <>
                <Toolbar className={classes.toolbar}>
                  {busy && <CircularProgress className={classes.busy} />}
                  <TextFilter
                    autoFocus={true}
                    value={filterValue}
                    className={classes.searchField}
                    fullWidth
                    onChange={setFilter}
                  />
                  <div style={{ flex: "1 0" }} />
                  <IconButton>
                    <Icon>more_vert</Icon>
                  </IconButton>
                </Toolbar>
                <List>
                  {!filtered ||
                    (!filtered.length && (
                      <ListItem
                        children={<ListItemText>Not Found</ListItemText>}
                      />
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
                  isOpen={this.state.actionType === "deliver"}
                  onClose={() => {
                    this.setState({ actionType: undefined, item: undefined });
                  }}
                  item={item}
                />
              </>
            );
          }}
        />
      </div>
    );
  }
}
/** */
export default withStyles(styles)(ListView) as ComponentType<ListViewParams>;
