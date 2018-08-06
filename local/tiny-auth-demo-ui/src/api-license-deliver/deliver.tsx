import { Button, CircularProgress, Typography } from "@material-ui/core";
import withStyles, { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component } from "react";
import { Modal } from "../modal";
import { ApiActions, ApiState, ApiItem } from "./api";
import styles from "./styles";
/** */
export interface DeliverParams<T extends {} = {}> {
  onClose(): any;
  isOpen: boolean;
  item: T | undefined;
}
/** */
export interface ApiContext {
  api: ApiActions;
  apiState: ApiState;
}
/** */
export type DeliverProps<T> = DeliverParams<T> & ApiContext;
/** */
interface DeliverState<T> {
  error: string | undefined;
  isBusy: boolean;
  isError: boolean;
  isSuccess: boolean;
  isOpen: boolean;
  item: T | undefined;
  /** @descriptions delivered ids */
  delivered: string[];
}
/** */
class Deliver<T extends ApiItem = ApiItem> extends Component<DeliverProps<T> & { classes: ClassNameMap }, DeliverState<T>> {
  /** */
  state: DeliverState<T> = {
    error: undefined as string | undefined,
    isBusy: false,
    isError: false,
    isSuccess: false,
    isOpen: false,
    item: undefined,
    delivered: [],
  };
  /** */
  static getDerivedStateFromProps(props: DeliverProps<any>, state: DeliverState<any>) {
    let { error, delivered } = state;
    const { apiState, isOpen, item } = props;
    error = error || apiState.error;
    const isBusy = !!apiState.busy;
    const isSuccess = !!apiState.success && !!item && (delivered.indexOf(item.id) !== -1);
    const isError = !!error;
    return {
      delivered,
      error,
      isBusy,
      isError,
      isSuccess,
      isOpen,
      item,
    }
  }
  clearError = () => {
    this.setState({ error: undefined });
  }
  setDelivered = (item: T) => {
    const { delivered } = this.state;
    this.setState({
      delivered: delivered.concat(item.id)
    })
  }
  deliver = async () => {
    if (!this.props.item) {
      throw new Error("No Item");
    }
    try {
      this.clearError();
      const action = await this.props.api.deliver(this.props.item.id);
      if (action && action.payload instanceof Error) {
        throw action.payload;
      }
      if (action && action.error instanceof Error) {
        throw action.error;
      }
      this.setDelivered(this.props.item);
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
    const { isSuccess, isError } = this.state;
    if (isSuccess) {
      return this.props.onClose();
    }
    if (isError) {
      return this.props.onClose();
    }
    this.deliver();
  };
  onAgain = () => {
    this.deliver();
  }
  /** */
  renderMessage = () => {
    const { isBusy, isSuccess, isError, error } = this.state;
    const displayName = this.props.item && this.props.item.displayName || undefined;
    return (<div>
      <Typography variant="headline">{displayName}</Typography>
      {isBusy && <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}><Typography variant="headline">Please wait...</Typography><CircularProgress /></div>}
      {!!isError && (<Typography variant="title" color="error">{error}</Typography>)}
      {isSuccess && <Typography variant="headline" color="primary">Success</Typography>}
    </div>)
  }
  /** */
  renderActions = () => {
    const { classes } = this.props;
    const { onOk, onAgain, } = this;
    const { isSuccess, isError, isBusy, item, isOpen } = this.state;
    if (!item || !isOpen) return null;
    return <>
      {(isSuccess || isError) && <Button
        style={{ color: "orange" }}
        className={classes.button}
        disabled={isBusy}
        variant="outlined"
        onClick={onAgain}
      >
        Again
        </Button>}
      <Button
        className={classes.button}
        disabled={isBusy}
        variant="outlined"
        onClick={onOk}
      >
        OK
        </Button>
    </>
  }
  render() {
    const { isOpen } = this.props;
    const { onCancel } = this;
    // if (!item || !isOpen) return null;
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
