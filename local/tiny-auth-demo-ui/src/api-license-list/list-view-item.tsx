import { Avatar, Icon, IconButton, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import * as React from "react";
import { Component } from "react";
import { ApiItem } from "./api";

export type ActionType = "deliver" | "edit" | "delete" | "view";

export interface ListViewItemProps {
    index?: number;
    item: ApiItem;
    onRequestAction(action: ActionType, item: ApiItem): any;
}

export default class ListViewItem extends Component<ListViewItemProps>{

    /** */
    render() {
        const { item, index } = this.props;
        return <ListItem>
            <ListItemAvatar>
                <Avatar style={{ backgroundColor: "transparent" }}>
                    <IconButton onClick={() => { this.props.onRequestAction("view", item) }}
                        title={"View"}>
                        <Icon style={{ fontSize: "32px" }}>class</Icon></IconButton>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                style={{ marginRight: "1rem", paddingRight: "1rem" }}
                primary={(typeof index === "number" ? `${index}: ` : "") + item.displayName} secondary={item.description} />
            <div style={{ flex: "1 0" }} />
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <IconButton onClick={() => { this.props.onRequestAction("edit", item) }}
                    title={"Edit"}><Icon>edit</Icon></IconButton>
                <IconButton onClick={() => { this.props.onRequestAction("delete", item) }}
                    title={"Delete"}><Icon>delete</Icon></IconButton>
                <IconButton onClick={() => { this.props.onRequestAction("deliver", item) }}
                    title={"Deliver"}><Icon>send</Icon></IconButton>
            </div>
        </ListItem>
    }
}