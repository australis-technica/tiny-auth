import { TextField, MenuItem, ListItemText } from "@material-ui/core";
import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import createApi, { CrudApiActions, CrudApiState } from "../crud-api";

const apiDefaultState: CrudApiState = {
    busy: false,
    error: undefined
};
export const api = createApi("customer-lookup", apiDefaultState, {
    endpoint: "http://localhost:4888/api/customers"
});
/** 
 * @description Warning partially typed api result item
 */
interface ApiItem { displayName: string, id: string };
/**
 * params
 */
export interface LookupFieldParams {
    id: string;
    validation: string | undefined;
    disabled: boolean;
    /**
     * @param item @type {ApiItem} 
     */
    onSelectionChanged(item: ApiItem | undefined): any;
    value: string
    label: string;
    helperText: string;
    className?: string;
}
/** */
export interface LookupFieldState {
    apiState: CrudApiState;
}
/** */
export interface LookupFieldActions {
    api: CrudApiActions
}
/** */
export type LookupFieldsProps = LookupFieldParams & LookupFieldState & LookupFieldActions;
/**
 * 
 */
class LookupField extends Component<LookupFieldsProps> {
    componentDidMount() {
        this.props.api.fetch({
            method: "GET"
        })
    }
    onChange = (id: string) => {
        const data: ApiItem[] = this.props.apiState.data || [];
        this.props.onSelectionChanged(data.find(x => x.id === id));
    }
    /** */
    handleOnChange = (f: (value: string) => any): React.ChangeEventHandler<HTMLInputElement> => {
        return (e) => {
            f(e.target.value);
        }
    }
    /** */
    render() {
        const { id, label, className, validation, disabled, value, apiState, helperText } = this.props;
        const { data } = apiState;
        const items = (data || []);
        const error = validation || apiState.error;
        return <TextField
            select
            id={id}
            className={className}
            label={label}
            helperText={validation || error || helperText}
            error={!!error}
            disabled={disabled || apiState.busy}
            value={value}
            onChange={this.handleOnChange(this.onChange)}
        >
            {items.map((item: ApiItem, index: number) => {
                const { displayName, id } = item;
                return <MenuItem key={`lookup_item_${index}`} value={id}>
                    <ListItemText primary={displayName} secondary={id} />
                </MenuItem>
            })}
        </TextField>
    }
}
const selector = createSelector(api.selector, (state) => ({ apiState: state }));
const bindActions = (dispatch: Dispatch) => {
    return {
        api: api.bindActions(dispatch)
    }
}
/**
 * 
 */
const Connected: React.ComponentType<LookupFieldParams> = connect(selector, bindActions)(LookupField);
export default Connected;