import {
  Button,
  Checkbox,
  FormControlLabel,
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
import { Component, Fragment } from "react";
import { ConfirmAction } from "../confirm-action";
import { CrudViewActions } from "../crud-view";
import { CheapPreview, FormDataProps, util } from "../form-data";
import FormView from "./form-view";
import { ViewState } from "./store";
import styles from "./styles";
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
  saveActionMessage = () => {
    const { formData } = this.props;
    return (
      <div>
        <Typography> Submit Data ? </Typography>
        <CheapPreview data={formData} />
      </div>
    );
  };
  resetForm = () => {
    this.props.resetForm();
  };
  resetFormActionMessage = () => {
    return <Typography>Reset Form Data?</Typography>;
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
      setWarning,
      setConfirmAction
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
                  onClick={handleMenuAction(setConfirmAction("reset-form"))}
                >
                  <ListItemText children="Reset/Clear Form" />
                </MenuItem>
              </Menu>
            </Fragment>
          </Toolbar>
          <form className={classes.form} autoComplete="off" noValidate>
            <FormView
              validationRules={{
                displayName: {
                  test: true,
                  message: "Required"
                },
                email: {
                  test: util.EMAIL_REGEX,
                  message: "Invalid email"
                },
                description: {
                  test: true,
                  message: "description Required!"
                }
              }}
              render={(formDataProps: any) => {
                const { setFormState, formData, validation } = formDataProps;
                return (
                  <Fragment>
                    <TextField
                      id="displayName"
                      className={classes.textField}
                      label="Display Name"
                      helperText={
                        validation.displayName || "important helper text"
                      }
                      error={!!validation.displayName}
                      disabled={!!this.props.busy}
                      value={formData.displayName}
                      onChange={e => {
                        setFormState({ displayName: e.target.value });
                      }}
                    />
                    <TextField
                      id="description"
                      className={classes.textField}
                      label="Description"
                      helperText={
                        validation.description || "important helper text"
                      }
                      error={!!validation.description}
                      disabled={!!this.props.busy}
                      value={formData.description}
                      onChange={e => {
                        setFormState({ description: e.target.value });
                      }}
                    />
                    <TextField
                      id="contact"
                      className={classes.textField}
                      label="Contact"
                      helperText={validation.contact || "important helper text"}
                      error={!!validation.contact}
                      disabled={!!this.props.busy}
                      value={formData.contact}
                      onChange={e => {
                        setFormState({ contact: e.target.value });
                      }}
                    />
                    <TextField
                      id="phone"
                      className={classes.textField}
                      label="Phone"
                      helperText={validation.phone || "important helper text"}
                      error={!!validation.phone}
                      disabled={!!this.props.busy}
                      value={formData.phone}
                      onChange={e => {
                        setFormState({ phone: e.target.value });
                      }}
                    />
                    <TextField
                      id="email"
                      type="email"
                      className={classes.textField}
                      label="Email"
                      helperText={validation.email || "important helper text"}
                      error={!!validation.email}
                      disabled={!!this.props.busy}
                      value={formData.email}
                      onChange={e => setFormState({ email: e.target.value })}
                    />
                    <TextField
                      id="notes"
                      type="text"
                      multiline={true}
                      rows={3}
                      className={classes.textFieldMultiline}
                      label="Notes"
                      helperText={
                        validation.notes ||
                        "NOTE: address lines should be honored"
                      }
                      error={!!validation.notes}
                      disabled={!!this.props.busy}
                      value={formData.notes}
                      onChange={e => setFormState({ notes: e.target.value })}
                    />
                    <FormControlLabel
                      className={classes.checkbox}
                      label="Enabled"
                      control={
                        <Checkbox
                          checked={formData.enabled}
                          onChange={e => {
                            setFormState({ enabled: e.target.checked });
                          }}
                        />
                      }
                    />
                  </Fragment>
                );
              }}
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
          actionTitle={"Confirm Action"}
          actionMessage={
            this.props.confirmAction === "save" && this.saveActionMessage()
          }
          acceptAction={handleActionToConfirm(this.save, () =>
            setWarning("Save Action Cancelled")
          )}
        />
        <ConfirmAction
          classes={classes}
          isOpen={this.props.confirmAction === "reset-form"}
          actionTitle="Confirm Action"
          actionMessage={
            this.props.confirmAction === "reset-form" &&
            this.resetFormActionMessage()
          }
          acceptAction={handleActionToConfirm(this.resetForm)}
        />
      </Fragment>
    );
  } // render
}

export default withStyles(styles)(View);
