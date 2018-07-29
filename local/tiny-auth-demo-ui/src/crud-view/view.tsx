import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { Component, Fragment, ReactNode } from "react";
import { CrudViewState, CrudViewActions } from "./types";
import * as React from "react";
import {
  Paper,
  Toolbar,
  Typography,
  Button,
  withStyles
} from "@material-ui/core";
import { ConfirmAction } from "../confirm-action";
import styles from "./styles";
import { Menu } from "../menu";
/**
 * 
 */
export type CrudViewProps = CrudViewParams &
  CrudViewState &
  CrudViewActions & { classes: ClassNameMap };
/**
 *
 */
export interface CrudViewParams {
  header: ReactNode;
  renderForm?(props: CrudViewProps): ReactNode;
  renderToolbarItems?(props: CrudViewProps): ReactNode;
  renderMenuItems?(props: CrudViewProps): ReactNode;
}
/** */
export class CrudView extends Component<CrudViewProps> {
  /** */
  save = async () => {
    try {
      this.props.setBusy(true);
      await this.props.delay(1500);
      this.props.setSuccess("action1 Done!");
    } catch (error) {
      this.props.setError(error);
    } finally {
      this.props.setBusy(false);
    }
  };
  /** */
  cancel = async () => {
    try {
      this.props.setBusy(true);
      await this.props.delay(1500);
      this.props.setSuccess("Action2: Completed");
    } catch (error) {
      this.props.setError(error);
    } finally {
      this.props.setBusy(false);
    }
  };
  /** */
  renderMenu() {
    if (!this.props.renderMenuItems) return null;
    const { isMenuOpen } = this.props;
    return [
      <Menu
        busy={this.props.busy}
        openMenu={this.props.openMenu}
        isOpen={!!isMenuOpen}
        closeMenu={this.props.closeMenu}
      >
        {this.props.renderMenuItems(this.props)}
      </Menu>
    ];
  }
  /** */
  renderToolbarItems = () => {
    if (!this.props.renderToolbarItems) return null;
    return this.props.renderToolbarItems(this.props);
  };
  /** */
  renderForm = () => {
    if (!this.props.renderForm) return null;
    const { classes } = this.props;
    return (
      <form className={classes.form}>{this.props.renderForm(this.props)}</form>
    );
  };
  /** */
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Paper className={classes.paper} elevation={0.5}>
          <Toolbar>
            <Typography variant="title">{this.props.header}</Typography>
            <div style={{ flex: "1 0" }} />
            {this.renderToolbarItems()}
            {this.renderMenu()}
          </Toolbar>
          {this.renderForm()}
          <div className={classes.actions}>
            <Button
              className={classes.button}
              variant="raised"
              disabled={!!this.props.busy}
              children="Cancel"
              onClick={this.props.setConfirmAction("cancel")}
            />
            <Button
              className={classes.button}
              variant="raised"
              color="primary"
              disabled={!!this.props.busy}
              children="Save"
              onClick={this.props.setConfirmAction("save")}
            />
          </div>
        </Paper>
        <ConfirmAction
          classes={classes}
          isOpen={this.props.confirmAction === "save"}
          actionTitle={"Confirm Save Action"}
          actionMessage={"Ready to Save?"}
          acceptAction={this.props.handleActionToConfirm(this.save, () =>
            this.props.setError("Save Action Cancelled")
          )}
        />
        <ConfirmAction
          classes={classes}
          isOpen={this.props.confirmAction === "cancel"}
          actionTitle={"Confirm Cancel Cancel Action"}
          actionMessage={"Cancel Cancel Action?"}
          acceptAction={this.props.handleActionToConfirm(this.cancel, () =>
            this.props.setError("ACancel Action Cancelled")
          )}
        />
      </Fragment>
    );
  } // render
}
/** */
export default withStyles(styles)(CrudView) as React.ComponentType<
  CrudViewParams & CrudViewState & CrudViewActions
>;
