import { Button, Icon, IconButton, ListItemText, Menu, MenuItem, Paper, Snackbar, TextField, Toolbar, Typography, withStyles } from "@material-ui/core";
import { ClassNameMap, StyleRulesCallback } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component, ComponentType, Fragment } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import { ConfirmAction } from "../confirm-action";
import { SnackbarContentWithSatus, MessageStatus } from "../snackbar-content-with-satus";
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
function getErrorMessage(error?: string | Error | undefined): string | undefined {
  return !error ? undefined : typeof error === "string" ? error : error.message ? error.message : error.toString();
}
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
      setError = (error?: Error | string) => {
        this.props.setState({ actionToConfirmResult: getErrorMessage(error) });
      }
      setBusy = (busy: boolean) => {
        this.props.setState({ busy });
      }
      confirmAction = (actionToConfirm: string) => {
        return () => this.props.setState({
          actionToConfirm,
        });
      };
      /** */
      removeActionToConfirm = () => {
        this.props.setState({
          actionToConfirm: undefined,
        })
      }
      /**
       * 
       */
      handleActionToConfirm = (callback?: (actionType?: string) => any) => {
        return (actionType: string) => {
          this.removeActionToConfirm();
          typeof callback === "function" && callback(actionType);
        }
      }
      /**
       * 
       */
      setActionToConfirmResult = (message: string | undefined, status: MessageStatus | undefined) => {
        this.props.setState({
          actionToConfirmResult: message,
          actionToConfirmResultStatus: status
        })
      }
      /**
       * 
       */
      actionToConfirmResultClear = () => {
        this.props.setState({
          actionToConfirmResult: undefined,
          actionToConfirmResultStatus: undefined
        })
      }
      delay = (n: number) => new Promise(resolve => setTimeout(resolve, n));
      /** */
      action1 = async (actionType: string) => {
        try {
          this.setBusy(true);
          await this.delay(1500);
          this.setActionToConfirmResult("Done", "success");
        } catch (error) {
          this.setActionToConfirmResult(error, "error");
        } finally {
          this.setBusy(false);
        }
      }
      /** */
      action2 = async (actionType: string) => {
        try {
          this.setBusy(true);
          await this.delay(1500);
          this.setActionToConfirmResult("Action2: Completed", "success");
        } catch (error) {
          this.setActionToConfirmResult(getErrorMessage(error), "error");
        } finally {
          this.setBusy(false);
        }
      }

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
                      onClick={this.handleMenuAction(this.confirmAction("action1"))}
                    >
                      <ListItemText children="Action:1" />
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleMenuAction(this.confirmAction("action2"))}
                    >
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
              isOpen={actionType => actionType === "action1"}
              actionType={this.props.actionToConfirm}
              actionTittle={"Confirm Action:1"}
              actionMessage={"Really do Action:1?"}
              acceptAction={this.handleActionToConfirm(this.action1)}
              cancelAction={this.handleActionToConfirm(() => {
                this.setActionToConfirmResult("Action:1 Cancelled", "error")
              })}
            />
            <ConfirmAction
              classes={classes}
              isOpen={actionType => actionType === "action2"}
              actionType={this.props.actionToConfirm}
              actionTittle={"Confirm Action:2"}
              actionMessage={"Really do Action:2?"}
              acceptAction={this.handleActionToConfirm(this.action2)}
              cancelAction={this.handleActionToConfirm(() => {
                this.setActionToConfirmResult("Action:2 Cancelled", "error")
              })}
            />
            <Snackbar
              open={!!this.props.actionToConfirmResult}
              onClose={this.actionToConfirmResultClear}
            >
              <SnackbarContentWithSatus
                variant={this.props.actionToConfirmResultStatus || "info"}
                message={this.props.actionToConfirmResult}
                onClose={this.actionToConfirmResultClear} />
            </Snackbar>
          </Fragment>
        );
      } // render    
    }
  )
);
/**
 * 
 */
export default class CustomerList extends Component<{}> {
  render() {
    return <Connected />;
  }
}
