import { Button, CircularProgress, Typography } from "@material-ui/core";
import withStyles, { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component } from "react";
import { Modal } from "../modal";
import { ApiActions, ApiState } from "./api";
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
      if (action && action.payload instanceof Error) {
        throw action.payload;
      }
      if (action && action.error instanceof Error) {
        throw action.error;
      }
    } catch (error) {
      this.setState({
        error: error.message
      });
    }
  };
  onCancel = () => {
    this.props.onClose();
  };
  onOk = () => {
    if (!!this.props.apiState.success) {
      return this.props.onClose();
    }
    this.deliver();
  };
  onAgain = () => {
    this.deliver();    
  }
  renderMessage = () => {
    const error = this.state.error || this.props.apiState.error || undefined;
    const busy = this.props.apiState.busy;
    const displayName = this.props.item && this.props.item.displayName || undefined;
    const success = !!this.props.apiState.success;
    return (<div>
      <Typography variant="headline">{displayName}</Typography>
      {busy && <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}><Typography variant="headline">Please wait...</Typography><CircularProgress /></div>}
      {!!error && (<Typography variant="title" color="error">{error}</Typography>)}
      {success && <Typography variant="headline" color="primary">Success</Typography>}
    </div>)
  }
  renderActions = () => {
    const { item, isOpen, apiState, classes } = this.props;
    const { onOk, onAgain } = this;
    if (!item || !isOpen) return null;
    const busy = !!apiState.busy;
    const success = !!apiState.success;
    return <>
      {success && <Button 
        style={{ color: "orange" }}
        className={classes.button}
        disabled={busy}
        variant="outlined"
        onClick={onAgain}
      >
        Again
        </Button>}
      <Button
        className={classes.button}
        disabled={busy}
        variant="outlined"
        onClick={onOk}
      >
        OK
        </Button>
    </>
  }
  render() {
    const { item, isOpen } = this.props;
    const { onCancel } = this;
    if (!item || !isOpen) return null;
    return (
      <Modal isOpen={isOpen} onClose={onCancel}
        dialogTitle={"Deliver"}
        dialogContent={this.renderMessage()}
        dialogActions={this.renderActions()}
      />
    );
  }
}
export default withStyles(styles)(Deliver);
