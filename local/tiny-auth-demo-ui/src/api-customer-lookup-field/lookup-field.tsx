import { ListItemText, MenuItem, TextField } from "@material-ui/core";
import * as React from "react";
import { Component } from "react";
import { ApiActions, ApiState, ApiItem } from "./api";
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
    apiState: ApiState;
}
/** */
export interface LookupFieldActions {
    api: ApiActions
}
/** */
export type LookupFieldsProps = LookupFieldParams & LookupFieldState & LookupFieldActions;
/**
 * 
 */
export default class LookupField extends Component<LookupFieldsProps> {
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
        const { id, label, className, validation, value, apiState, helperText } = this.props;
        const { data } = apiState;
        const items = (data || []);
        const error = validation || apiState.error;
        const disabled = this.props.disabled || apiState.busy
        return <TextField
            select
            id={id}
            className={className}
            label={label}
            helperText={(apiState.busy && "...Busy") || validation || error || helperText}
            error={!!error}
            disabled={disabled}
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
