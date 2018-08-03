import Toolbar from "@material-ui/core/Toolbar";
import PageSizeMenu from "./page-size-menu";
import * as React from "react";
import Button from "@material-ui/core/Button";
import { Component } from "react";
import { RenderProps } from "./with-pager";
/** */
export type PagerbarProps = RenderProps<any> & {
    pageSizes: number[];
}
/** */
export default class Pagerbar extends Component<PagerbarProps> {
    render() {
        const { setPageSize, prev, next, pageSizes } = this.props;
        return <Toolbar>
            <PageSizeMenu setPageSize={setPageSize} pageSizes={pageSizes} />
            <div style={{ flex: "1 0" }} />
            <Button children="Prev" onClick={prev} />
            <Button children="Next" onClick={next} />
        </Toolbar>
    }
}