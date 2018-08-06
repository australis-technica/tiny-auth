import { Avatar, Icon, IconButton, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import * as React from "react";
import { Component } from "react";
import { ApiItem } from "./api";
import { MenuResponsive } from "../menu/";

export type ActionType = "deliver" | "edit" | "delete" | "view" | "download";

export interface ListViewItemProps {
    disabled?: boolean;
    index?: number;
    item: ApiItem;
    onRequestAction(action: ActionType, item: ApiItem): any;
}

export default class ListViewItem extends Component<ListViewItemProps>{
    onRequestAction(action: ActionType, item: ApiItem): any {
        return () => this.props.onRequestAction(action, item);
    }
    /** */
    render() {
        const { item, index, disabled } = this.props;
        return <ListItem disabled={disabled}>
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
            <MenuResponsive breakpoint="md" renderChildren={(menu) => <>
                <IconButton onClick={menu.handleMenuAction(this.onRequestAction("edit", item))}
                    title={"Edit"}><Icon>edit</Icon></IconButton>
                <IconButton onClick={() => { this.props.onRequestAction("delete", item) }}
                    title={"Delete"}><Icon>delete</Icon></IconButton>
                <IconButton onClick={() => { this.props.onRequestAction("download", item) }}
                    title={"Download"}><Icon>cloud_download</Icon></IconButton>
                <IconButton onClick={() => { this.props.onRequestAction("deliver", item) }}
                    title={"Deliver"}><Icon>send</Icon></IconButton>
            </>}>
            </MenuResponsive>
            {this.props.children}
        </ListItem>
    }
}