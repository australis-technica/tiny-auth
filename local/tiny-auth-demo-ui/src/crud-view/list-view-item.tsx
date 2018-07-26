import { Component } from "react";
import * as React from "react";
/**
 * 
 */
export default class ListViewItem extends Component<{
    value: {};
    fields: string[];
}> {
    get keyValues() {
        const { value, fields } = this.props;
        const keys = Object.keys(value || {});
        const keyValues = keys
            .filter(key =>
                !fields || (fields || []).indexOf(key) !== -1
            )
            .map(key => ({ key, value: value[key] }));
        return keyValues;
    }
    render() {
        return <div style={{ margin: "1rem", display: "flex", flexDirection: "row" }}>
            {this.keyValues.map((field, i) => <div key={`field:${i}`} style={{ margin: "1rem" }}><span>{field.key}</span>:<span>{field.value}</span></div>)}
        </div>
    }
}