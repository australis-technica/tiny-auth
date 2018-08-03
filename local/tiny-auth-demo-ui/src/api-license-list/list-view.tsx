import { CircularProgress, List, ListItem, ListItemText, MenuItem, Toolbar } from "@material-ui/core";
import withStyles, { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component, ComponentType } from "react";
import { Connected as Deliver } from "../api-license-deliver";
import { QuickMenu, WithMenuState } from "../menu";
import { Pagerbar, WithPager } from "../pager";
import { TextFilter, WithTextFilter } from "../text-filter";
import { ApiActions, ApiItem, ApiState } from "./api";
import ListViewItem, { ActionType } from "./list-view-item";
import styles from "./list-view-styles";
export interface ListViewParams {}
/** */
export type ApiContext = {
  apiState: ApiState;
  api: ApiActions;
};
/** */
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
  fetch = () => {
    this.props.api.fetch({
      method: "GET"
    });
  };
  componentDidMount() {
    this.fetch();
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
              <WithPager
                data={filtered}
                pageSize={5}
                render={pager => {
                  return (
                    <>
                      <Toolbar className={classes.toolbar}>
                        {busy && <CircularProgress className={classes.busy} />}
                        <TextFilter
                          disabled={!!busy}
                          autoFocus={true}
                          value={filterValue}
                          className={classes.searchField}
                          fullWidth
                          onChange={setFilter}
                        />
                        <div style={{ flex: "1 0" }} />
                        <WithMenuState
                          render={menu => (
                            <QuickMenu
                              disabled={!!busy}
                              isOpen={menu.isOpen}
                              onClose={menu.closeMenu}
                              onRequestOpen={menu.openMenu}
                            >
                              <MenuItem onClick={this.fetch} disabled={!!busy}>                                
                                <ListItemText >Reload</ListItemText>
                              </MenuItem>
                            </QuickMenu>
                          )}
                        />
                      </Toolbar>
                      <List>
                        {!pager.paged ||
                          (!pager.paged.length && (
                            <ListItem
                              children={<ListItemText>Not Found</ListItemText>}
                            />
                          ))}
                        {pager.paged.map((item, i) => (
                          <ListViewItem
                            disabled={!!busy}
                            key={`list_item_${i}`}
                            item={item}
                            onRequestAction={(actionType, item) => {
                              this.setState({ actionType, item });
                            }}
                          />
                        ))}
                      </List>
                      <Pagerbar {...pager} pageSizes={[3, 5, 10]} disabled={!!busy}/>
                      <Deliver
                        isOpen={this.state.actionType === "deliver"}
                        onClose={() => {
                          this.setState({
                            actionType: undefined,
                            item: undefined
                          });
                        }}
                        item={item}
                      />
                    </>
                  );
                }}
              />
            );
          }}
        />
      </div>
    );
  }
}
/** */
export default withStyles(styles)(ListView) as ComponentType<ListViewParams>;
