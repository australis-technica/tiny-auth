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
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component, ComponentType, Fragment } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { ConfirmAction } from "../confirm-action";
import adapter, { ViewState } from "./add-state";
import styles from "./add-styles";
import { actionBinder, CrudViewActions } from "../crud-view";
import formDataStore from "./add-form-data";
import { Dispatch } from "redux";
/** */
const selector = createSelector(
  adapter.selector,
  formDataStore.selector,
  (state, formData) => ({ ...state, formData })
);

interface FormDataState {
  formData: { [key: string]: any };
}
interface FormDataActions {
  setFormData({}): any;
}
type FormDataProps = FormDataState & FormDataActions;
/**
 * parameters
 */
export interface ViewProps {
  // ...
}
/** */
class View extends Component<
  ViewState & CrudViewActions & FormDataProps & { classes: ClassNameMap }
> {
  /** */
  save = async () => {
    const { setBusy, setError, setSuccess, delay } = this.props;
    try {
      setBusy(true);
      await delay(1500);
      setSuccess("Save Completed!");
    } catch (error) {
      setError(error);
    } finally {
      setBusy(false);
    }
  };

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
    const {
      classes,
      isMenuOpen,
      handleActionToConfirm,
      handleMenuAction,
      setError,
      setConfirmAction,
      formData,
      setFormData
    } = this.props;
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
                  onClick={handleMenuAction(setConfirmAction("action1"))}
                >
                  <ListItemText children="Action:1" />
                </MenuItem>
                <MenuItem
                  onClick={handleMenuAction(setConfirmAction("action2"))}
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
              value={formData.displayName}
              onChange={e => {
                setFormData({ displayName: e.target.value });
              }}
            />
            <TextField
              type="email"
              className={classes.textField}
              label="Email"
              helperText="important helper text"
              disabled={!!this.props.busy}
              value={formData.email}
              onChange={e => setFormData({ email: e.target.value })}
            />
          </form>
          <div className={classes.actions}>
            <Button
              className={classes.button}
              variant="raised"
              disabled={!!this.props.busy}
            >
              Cancel
            </Button>
            <Button
              className={classes.button}
              variant="raised"
              color="primary"
              disabled={!!this.props.busy}
              onClick={setConfirmAction("save")}
            >
              Save
            </Button>
          </div>
        </Paper>
        <ConfirmAction
          classes={classes}
          isOpen={this.props.confirmAction === "save"}
          actionTittle={"Confirm Action"}
          actionMessage={"Save?"}
          acceptAction={handleActionToConfirm(this.save, () =>
            setError("Save Action Cancelled")
          )}
        />
      </Fragment>
    );
  } // render
}
/** */
const bindActions = actionBinder(adapter.actions.setState);
const combineActions = (dispatch: Dispatch) => {
  const actions = bindActions(dispatch);
  return {
    ...actions,
    setFormData: (data: {}) => {
      dispatch(formDataStore.actions.setState(data));
    }
  };
};
const Connected: ComponentType<ViewProps> = connect(
  selector,
  combineActions
)(withStyles(styles)(View));
export default Connected;
