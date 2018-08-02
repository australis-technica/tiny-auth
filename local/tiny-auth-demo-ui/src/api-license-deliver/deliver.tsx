import * as React from "react";
import { Component } from "react";
import {
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import withStyles, { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { ApiState, ApiActions } from "./api";
import styles from "./styles";
export interface DeliverParams {
  onClose(): any;
  isOpen: boolean;
  item: { displayName: string; id: string } | undefined;
}
export interface ApiContext {
  api: ApiActions;
  apiState: ApiState;
}
/** */
export type DeliverProps = DeliverParams & ApiContext;

class Deliver extends Component<DeliverProps & { classes: ClassNameMap }> {
  state = {
    error: undefined as string | undefined
  };
  deliver = async () => {
    if (!this.props.item) {
      throw new Error("No Item");
    }
    try {      
      const action = await this.props.api.deliver(this.props.item.id);      
      if(action && action.payload instanceof Error){
          throw action.payload;
      }
      if(action && action.error instanceof Error){
        throw action.error;
    }
      this.props.onClose();
    } catch (error) {
      this.setState({
        error: error.message
      });
    }
  };
  render() {
    const { classes, item, isOpen, onClose, apiState } = this.props;
    if (!item || !isOpen) return null;
    const { displayName } = item;
    const error = this.state.error || apiState.error;
    const busy = !!apiState.busy;
    return (
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>
          <Typography variant="title">Deliver</Typography>
          {!!error && (
            <Typography variant="title" color="error">
              {error}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography className={classes.dialogContentTitle} variant="headline">
            Deliver "{displayName}" license?
          </Typography>
          {busy && <span>...busy</span>}
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            className={classes.buttonCancel}
            variant="raised"
            onClick={onClose}
            disabled={busy}
          >
            Cancel
          </Button>
          <Button
            className={classes.buttonOk}
            disabled={busy}
            variant="raised"
            onClick={this.deliver}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default withStyles(styles)(Deliver);
