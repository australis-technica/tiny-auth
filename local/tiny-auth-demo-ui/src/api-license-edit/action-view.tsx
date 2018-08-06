import { Button } from "@material-ui/core";
import withStyles, { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component } from "react";
import { Modal } from "../modal";
import { ApiActions, ApiState, ApiItem } from "./api";
import styles from "./styles";
import ActionBody from "./action-body";
/** */
export interface ActionViewParams<T extends {} = {}> {
  title?: string;
  onClose(): any;
  isOpen: boolean;
  item: T | undefined;
  onSuccess?(): any;
}
/** */
export interface ApiContext {
  api: ApiActions;
  apiState: ApiState;
}
/** */
export type ActionViewProps<T> = ActionViewParams<T> & ApiContext;
/** */
export interface ActionViewState<T> {
  error: string | undefined;
  isBusy: boolean;
  isError: boolean;
  isSuccess: boolean;
  isOpen: boolean;
  item: T | undefined;
  /** @description transcient, completed ids */
  completed: string[];
  /** @description transcient, errored ids */
  errors: string[];

}
/** */
class ActionView extends Component<ActionViewProps<ApiItem> & { classes: ClassNameMap }, ActionViewState<ApiItem>> {
  /** */
  state: ActionViewState<ApiItem> = {
    error: undefined as string | undefined,
    isBusy: false,
    isError: false,
    isSuccess: false,
    isOpen: false,
    item: undefined,
    completed: [],
    errors: [],
  };
  /** */
  static getDerivedStateFromProps(props: ActionViewProps<any>, state: ActionViewState<any>) {
    let { error, errors, completed, } = state;
    const { apiState, isOpen, item } = props;
    error = error || apiState.error;
    const isBusy = !!apiState.busy;
    const isSuccess = !!apiState.success && !!item && (completed.indexOf(item.id) !== -1);
    const isError = !!error && !!item && errors.indexOf(item.id) !== -1;
    return {

      completed,
      error,
      errors,
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
  setError = (item: ApiItem, error: Error | string) => {
    const message: string = error ? typeof error === "string" ? error : error.message ? error.message : error.toString() : error;
    this.setState({
      error: message,
      errors: this.state.errors.filter(e => e !== item.id).concat([item.id])
    });
  }
  setCompleted = (item: ApiItem) => {
    const { completed } = this.state;
    this.setState({
      completed: completed.filter(x => x !== item.id).concat(item.id)
    })
  }
  /** */
  send = async (item: ApiItem) => {
    try {
      this.clearError();
      const { description, displayName, enabled, notes, id } = item;
      const action = await this.props.api.send({ description, displayName, enabled, id, notes });
      if (action && action.payload instanceof Error) {
        throw action.payload;
      }
      if (action && action.error instanceof Error) {
        throw action.error;
      }
      this.setCompleted(item);
      this.props.onSuccess && this.props.onSuccess();
    } catch (error) {
      this.setError(item, error)
    }
  };
  /** */
  onCancel = () => {
    this.props.onClose();
  };
  /** */
  onOk = (item: ApiItem) => {
    const { isSuccess, isError } = this.state;
    if (isSuccess) {
      return this.props.onClose();
    }
    if (isError) {
      return this.props.onClose();
    }
    this.send(item);
  };
  /** */
  onAgain = (item: ApiItem) => {
    this.send(item);
  }
  /** */
  render() {
    const { isOpen } = this.props;
    const { onCancel } = this;
    const { isBusy } = this.state;
    return (
      <Modal
        isOpen={isOpen}
        onClose={onCancel}
        dialogTitle={this.props.title}
        disabled={isBusy}
        dialogContent={<ActionBody {...this.state} render={
          /** */
          (formState) => {
            const { classes } = this.props;
            const { isSuccess, isError, isBusy, item, isOpen } = this.state;
            const { formData, isValidationEmpty } = formState;
            if (!item || !isOpen) return null;
            return <>
              {(isSuccess || isError) && <Button
                style={{ color: "orange" }}
                className={classes.button}
                disabled={isBusy || !isValidationEmpty}
                variant="outlined"
                onClick={() => {
                  this.onAgain(formData)
                }}
              >
                Again
                </Button>}
              <Button
                className={classes.button}
                disabled={isBusy || !formState.isValidationEmpty}
                variant="outlined"
                onClick={() => {
                  this.onOk(formData)
                }}
              >
                OK
                </Button>
            </>
          }} />}
      />
    );
  }
}
export default withStyles(styles)(ActionView);
