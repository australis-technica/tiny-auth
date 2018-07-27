import { Button, Icon, IconButton, ListItemText, Menu, MenuItem, Paper, TextField, Toolbar, Typography, withStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component, ComponentType, Fragment } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import { ConfirmAction } from "../confirm-action";
import messages, { Message } from "../messages";
import adapter, { ViewState } from "./customer-add-state";
import styles from "./customer-add-styles";
/** */
const selector = createSelector(adapter.selector, state => ({ ...state }));
/** */
interface ViewActions {
  setState(payload: Partial<ViewState>): any;
  setMessage(message: Message): any;
  clearMessage(): any;
}
/**
 * parameters
 */
export interface ViewProps {
  // ...
}
/** */
const bindActions = (dispatch: Dispatch) => {
  return {
    setState: (payload: Partial<ViewState>) => {
      dispatch(adapter.actions.setState(payload));
    },
    setMessage: (payload: Message) => {
      dispatch(messages.actions.setMessage(payload));
    },
    clearMessage() {
      dispatch(messages.actions.clear());
    }

  };
};
/** */
function getErrorMessage(error?: string | Error | undefined): string | undefined {
  return !error ? undefined : typeof error === "string" ? error : error.message ? error.message : error.toString();
}
/** */
class View extends Component<ViewState & ViewActions & { classes: ClassNameMap }
  > {
  /** */
  setError = (error?: Error | string) => {
    this.props.setMessage({
      message: getErrorMessage(error),
      status: "error"
    })
  }
  /**
   * 
   */
  setSuccess = (message: string) => {
    this.props.setMessage({ message, status: "success" });
  }
  /** */
  setBusy = (busy: boolean) => {
    this.props.setState({ busy });
  }
  /** */
  confirmAction = (confirmAction: string) => {
    if (!confirmAction) {
      throw new Error("Nothing to Confirm");
    }
    return () => this.props.setState({
      confirmAction,
    });
  };
  /** */
  removeActionToConfirm = () => {
    this.props.setState({
      confirmAction: undefined,
    })
  }
  /** */
  handleActionToConfirm = (onOk?: () => any, onCancel?: () => any, ) => {
    return (ok: boolean) => {
      this.removeActionToConfirm();
      if (ok) {
        onOk && onOk();
      } else {
        onCancel && onCancel();
      }
    }
  }
  delay = (n: number) => new Promise(resolve => setTimeout(resolve, n));
  /** */
  action1 = async () => {
    try {
      this.setBusy(true);
      await this.delay(1500);
      this.setSuccess("action1 Done!");
    } catch (error) {
      this.setError(error);
    } finally {
      this.setBusy(false);
    }
  }
  /** */
  action2 = async () => {
    try {
      this.setBusy(true);
      await this.delay(1500);
      this.setSuccess("Action2: Completed");
    } catch (error) {
      this.setError(error);
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
                disabled={!!this.props.busy}
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
              disabled={!!this.props.busy}
            />
            <TextField
              className={classes.textField}
              label="Email"
              helperText="important helper text"
              disabled={!!this.props.busy}
            />
          </form>
          <div className={classes.actions}>
            <Button className={classes.button} variant="raised" disabled={!!this.props.busy}>
              Cancel
          </Button>
            <Button
              className={classes.button}
              variant="raised"
              color="primary"
              disabled={!!this.props.busy}
            >
              Save
          </Button>
          </div>
        </Paper>
        <ConfirmAction
          classes={classes}
          isOpen={this.props.confirmAction === "action1"}
          actionTittle={"Confirm Action1"}
          actionMessage={"Really do Action1"}
          acceptAction={this.handleActionToConfirm(this.action1, () => this.setError("Action 1 Cancelled"))}
        />
        <ConfirmAction
          classes={classes}
          isOpen={this.props.confirmAction === "action2"}
          actionTittle={"Confirm Action2"}
          actionMessage={"Really do Action2"}
          acceptAction={this.handleActionToConfirm(this.action1, () => this.setError("Action 2 Cancelled"))}
        />
      </Fragment>
    );
  } // render    
}
/** */
const Connected: ComponentType<ViewProps> = connect(selector, bindActions)(withStyles(styles)(View));
export default Connected;
