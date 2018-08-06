import { Button, CircularProgress, Typography } from "@material-ui/core";
import withStyles, { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component } from "react";
import { Modal } from "../modal";
import { ApiActions, ApiState, ApiItem } from "./api";
import styles from "./styles";
/** */
export interface ActionViewParams<T extends {} = {}> {
    onClose(): any;
    isOpen: boolean;
    item: T | undefined;
    title: string;
    onClompleted?(): any;
}
/** */
export interface ApiContext {
    api: ApiActions;
    apiState: ApiState;
}
/** */
export type ActionViewProps<T> = ActionViewParams<T> & ApiContext;
/** */
interface ActionViewState<T> {
    error: string | undefined;
    isBusy: boolean;
    isError: boolean;
    isSuccess: boolean;
    isOpen: boolean;
    item: T | undefined;
    /** @descriptions transcient, completed, ids */
    completed: string[];
}
/** */
class ActionView<T extends ApiItem = ApiItem> extends Component<ActionViewProps<T> & { classes: ClassNameMap }, ActionViewState<T>> {
    /** */
    state: ActionViewState<T> = {
        error: undefined as string | undefined,
        isBusy: false,
        isError: false,
        isSuccess: false,
        isOpen: false,
        item: undefined,
        completed: [],
    };
    /** */
    static getDerivedStateFromProps(props: ActionViewProps<any>, state: ActionViewState<any>) {
        let { error, completed } = state;
        const { apiState, isOpen, item } = props;
        error = error || apiState.error;
        const isBusy = !!apiState.busy;
        const isSuccess = !!apiState.success && !!item && (completed.indexOf(item.id) !== -1);
        const isError = !!error;
        return {
            completed,
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
        const { completed } = this.state;
        this.setState({
            completed: completed.concat(item.id)
        })
    }
    send = async () => {
        if (!this.props.item) {
            throw new Error("No Item");
        }
        try {
            this.clearError();
            const action = await this.props.api.send(this.props.item.id);
            if (action && action.payload instanceof Error) {
                throw action.payload;
            }
            if (action && action.error instanceof Error) {
                throw action.error;
            }
            this.setDelivered(this.props.item);
            this.props.onClompleted && this.props.onClompleted();
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
        this.send();
    };
    onAgain = () => {
        this.send();
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
                dialogTitle={this.props.title}
                dialogContent={this.renderMessage()}
                dialogActions={this.renderActions()}
            />
        );
    }
}
export default withStyles(styles)(ActionView);
