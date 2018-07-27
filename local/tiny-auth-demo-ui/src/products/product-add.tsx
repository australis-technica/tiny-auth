import { Component, ComponentType, Fragment } from "react";
import * as React from "react";
import { AddView, CrudViewParams, actionBinder, CrudViewProps } from "../crud-view";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { MenuItem, ListItemText, TextField } from "@material-ui/core";
import adapter from "./product-add-adapter";
import { ConfirmAction } from "../confirm-action";

const selector = createSelector(adapter.selector, state => ({ ...state }));

const View: ComponentType<CrudViewParams> = connect(selector, actionBinder(adapter.actions.setState))(AddView)
/**
 * 
 */
export default class ProductAdd extends Component<{}>{
    /**
     * 
     */
    renderForm = (props: CrudViewProps) => {
        const { classes, busy, setBusy, delay, setSuccess, setError, confirmAction } = props;
        const actionx = async () => {
            try {
                setBusy(true);
                await delay(1000);
                setSuccess("action X Done!");
            } catch (error) {
                setError(error);
            } finally {
                setBusy(false);
            }
        }
        return <Fragment>
            <TextField
                className={classes.textField}
                label="DisplayName"
                helperText="important helper text"
                disabled={!!busy}
            />
            <TextField
                className={classes.textField}
                label="Email"
                helperText="important helper text"
                disabled={!!busy}
            />
            <ConfirmAction
                classes={classes}
                isOpen={confirmAction === "actionx"}
                acceptAction={props.handleActionToConfirm(actionx)}
                actionMessage="Do Action x ?"
                actionTittle="Confirm Action x"
            />
        </Fragment>
    }
    /**
     * 
     */
    renderMenuItems = (props: CrudViewProps) => {
        // ...
        return [
            <MenuItem key="menu-item-001"
                onClick={props.handleMenuAction(props.setConfirmAction("actionx"))}
            >
                <ListItemText children="Action:x" />
            </MenuItem>,
            <MenuItem key="menu-item-002"
                onClick={props.handleMenuAction(props.setConfirmAction("action2"))}
            >
                <ListItemText children="Action:2" />
            </MenuItem>]
            ;
    }
    render() {
        // ...
        return <View header="New Product" renderMenuItems={this.renderMenuItems}
            renderForm={this.renderForm}
        />
    }
}