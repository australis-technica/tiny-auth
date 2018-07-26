import { Component } from "react";
import * as React from "react";
/**
 * 
 */
export interface ListViewItemProps {
    value: {};
}
/**
 * 
 */
export default class ListViewItem extends Component<ListViewItemProps> {

    render() {
        const { value } = this.props;
        const fields = Object.keys(value || {}).map(key => ({ key, value: value[key] }));
        return <div style={{ margin: "1rem", display: "flex", flexDirection: "row" }}>
            {fields.map((field,i) => <div key={`field:${i}`} style={{ margin: "1rem" }}><span>{field.key}</span>:<span>{field.value}</span></div>)}
        </div>
    }
}