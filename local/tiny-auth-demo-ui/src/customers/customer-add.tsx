import {
  Button,
  Icon,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import {
  ClassNameMap,
  StyleRulesCallback
} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component, ComponentType, Fragment } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import ConfirmAction from "./confirm-action";
import adapter, { ViewState } from "./customer-add-state";
/**
 *
 */
const styles: StyleRulesCallback = theme => ({
  actions: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit,
    width: "120px"
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing.unit,
    minHeight: "300px"
  },
  textField: {
    margin: theme.spacing.unit
  },
  paper: {
    flex: "1 0",
    width: "100%",
    alignItems: "center",
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
    backgroundColor: theme.palette.background.default
  }
});
/**
 *
 */
const selector = createSelector(adapter.selector, state => ({ ...state }));
/**
 *
 */
interface ViewActions {
  setState(payload: Partial<ViewState>): any;
}
/**
 * parameters
 */
export interface ViewProps {
  // ...
}
const bindActions = (dispatch: Dispatch) => {
  return {
    setState: (payload: Partial<ViewState>) => {
      dispatch(adapter.actions.setState(payload));
    }
  };
};
/** */
const Connected: ComponentType<ViewProps> = connect(
  selector,
  bindActions
)(
  /** */
  withStyles(styles)(
    //** */
    class extends Component<
      ViewState & ViewActions & { classes: ClassNameMap }
    > {
      menuButton: any;
      /** */
      openMenu = () => this.props.setState({ isMenuOpen: true });
      /** */
      closeMenu = () => this.props.setState({ isMenuOpen: false });
      /** */
      handleMenuAction = (action: () => any) => {
        return () => {
          this.closeMenu();
          action();
        };
      };
      /** */
      render() {
        const { classes, isMenuOpen } = this.props;
        return (
          <Fragment>
            <Paper className={classes.paper} elevation={0.5}>
              <Toolbar>
                <Typography variant="title">Add Customer</Typography>
                <div style={{ flex: "1 0" }} />
                <Fragment>
                  <IconButton
                    onClick={this.openMenu}
                    buttonRef={x => (this.menuButton = x)}
                  >
                    <Icon children="more_vert" />
                  </IconButton>
                  <Menu
                    open={!!isMenuOpen}
                    onClose={this.closeMenu}
                    anchorEl={this.menuButton}
                  >
                    <MenuItem
                      onClick={this.handleMenuAction(() => {
                        this.props.setState({
                          actionToConfirm: "Action:1",
                          actionToConfirmTitle: "Confirm Action:!",
                          actionToConfirmMessage: "Really do Action:1?"
                        });
                      })}
                    >
                      <ListItemText children="Action:1" />
                    </MenuItem>
                    <MenuItem onClick={this.handleMenuAction(() => {})}>
                      <ListItemText children="Action:2" />
                    </MenuItem>
                  </Menu>
                </Fragment>
              </Toolbar>
              <form className={classes.form}>
                <TextField
                  className={classes.textField}
                  label="DisplayName"
                  helperText="important helper text"
                />
                <TextField
                  className={classes.textField}
                  label="Email"
                  helperText="important helper text"
                />
              </form>
              <div className={classes.actions}>
                <Button className={classes.button} variant="raised">
                  Cancel
                </Button>
                <Button
                  className={classes.button}
                  variant="raised"
                  color="primary"
                >
                  OK
                </Button>
              </div>
            </Paper>
            <ConfirmAction
              classes={classes}
              actionType={this.props.actionToConfirm}
              actionMessage={this.props.actionToConfirmMessage}
              actionTittle={this.props.actionToConfirmTitle}
              acceptAction={actionType => {
                this.props.setState({
                  actionToConfirm: undefined,
                  actionToConfirmTitle: undefined,
                  actionToConfirmMessage: undefined
                });
                alert(actionType + " done");
              }}
              cancelAction={actionType => {
                this.props.setState({
                  actionToConfirm: undefined,
                  actionToConfirmTitle: undefined,
                  actionToConfirmMessage: undefined
                });
                alert(actionType + " cancelled");
              }}
            />
          </Fragment>
        );
      }
    }
  )
);

export default class CustomerList extends Component<{}> {
  render() {
    return <Connected />;
  }
}
