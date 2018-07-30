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
  withStyles,
  DialogContent,
  Dialog,
  DialogActions
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component, Fragment } from "react";
import { ConfirmAction, ConfirmActionActions } from "../confirm-action";
import { CrudApiActions, CrudApiState } from "../crud-api";
import { CheapPreview, FormDataProps, util } from "../form-data";
import { MenuActions } from "../menu";
import { MessageActions } from "../messages";
import FormView from "./form-view";
import { StoreActions, ViewState } from "./store";
import styles from "./styles";
import { delay } from "./util";
const log = process.env.NODE_ENV !== 'production' ? console.log.bind(console) : ()=> {};
/**
 * parameters
 */
export interface ViewProps {
  // ...
}
/**
 * this.View Wish
 * provided by this.action-binder
 */
export type ViewActions = StoreActions &
  ConfirmActionActions &
  MessageActions &
  MenuActions & {
  setBusy(busy: boolean): any;
};
/** */
class View extends Component<
  ViewState &
  ViewActions &
  FormDataProps & { api: CrudApiActions, apiState: CrudApiState } & {
    classes: ClassNameMap;
  }
  > {
  /** */
  onValidationChanged = (validation: {}) => {
    const validationEmpty = util.isValidationEmpty(validation);
    this.props.setState({ validation: Object.assign({}, this.props.validation, validation), validationEmpty });
  };
  /** */
  save = async () => {
    const {
      setBusy,
      setError,
      api,
      formData,
      validationEmpty
    } = this.props;
    try {
      if (!validationEmpty) {
        setError("Can't Save");
        return;
      }
      setBusy(true);
      await delay(1500);
      const {
        contact,
        description,
        displayName,
        email,
        enabled,
        phone
      } = formData;
      const body = {
        contact,
        description,
        displayName,
        email,
        enabled,
        phone
      };
      const r = await api.fetch({
        method: "POST",
        body        
      });
      log(r);     
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

  resetFormActionMessage = () => {
    return <Typography>Reset Form Data?</Typography>;
  };
  renderApiState() {
    const renderError = !!this.props.apiState.error;
    const renderSuccess = !!this.props.apiState.success;
    const renderBusy = !!this.props.apiState.busy;
    /** */
    return <Fragment>
      {renderBusy && <Dialog open={renderBusy}>
        <DialogContent>
          <Typography >Sending ... please wait!</Typography>
        </DialogContent>
      </Dialog>}
      {renderError && <Dialog open={!!this.props.apiState.error}>
        <DialogContent>
          <Typography color="error" variant="headline">{this.props.apiState.error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="raised" children={"OK"} onClick={this.props.api.clearError}/>
        </DialogActions>
      </Dialog>}
      {renderSuccess && <Dialog open={!!this.props.apiState.success}>
        <DialogContent>
          <Typography variant="headline">Saved</Typography>          
        </DialogContent>
        <DialogActions>
          <Button variant="raised" children={"OK"} onClick={this.props.api.clearSuccess}/>
        </DialogActions>
      </Dialog>}
    </Fragment>
  }

  menuButton: any;
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
                onClick={this.props.openMenu}
                buttonRef={x => (this.menuButton = x)}
                disabled={!!this.props.busy}
              >
                <Icon children="more_vert" />
              </IconButton>
              <Menu
                open={!!isMenuOpen}
                onClose={this.props.closeMenu}
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
          <FormView
            onValidationChanged={this.onValidationChanged}
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
              const { setFormState, formData, } = formDataProps;
              let { validation } = this.props;
              validation = validation || {};
              return (
                <form className={classes.form} autoComplete="off">
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
                </form>
              );
            }}
          />
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
              disabled={!!this.props.busy || !this.props.validationEmpty}
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
          acceptAction={handleActionToConfirm(this.props.resetForm)}
        />
        {this.renderApiState()}
      </Fragment>
    );
  } // render
}

export default withStyles(styles)(View);
