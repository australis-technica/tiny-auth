import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { history } from "./store";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
/**
 * 
 * @param props 
 */
export default function toolbarTitle(props: { title: React.ReactNode, rootUrl: string, classes: ClassNameMap }) {
    const { classes, title, rootUrl } = props;
    return <Typography variant="title" className={classes.appTitle} onClick={e => history.push(rootUrl)} color="inherit">{title}</Typography>
}