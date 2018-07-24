import { Component, Fragment } from "react";
import { Tabs, Tab } from "@material-ui/core";
import * as React from "react";
import ProductList from "./products-list";
import ProductAdd from "./product-add";

export default class ProductsView extends Component<{}>{
    /** */
    state = {
        tabIndex: 0
    }
    setTabIndex = (tabIndex: number) => {
        return () => this.setState({ tabIndex });
    }
    get name(): string {
        return (this as any).name
    }
    Switch = (tabIndex: number) => {
        switch (tabIndex) {
            case 0: {
                return <ProductList />
            }
            case 1: {
                return <ProductAdd />
            }
            default: {
                return null;
            }
        }
    }
    /** */
    render() {
        const { tabIndex } = this.state;
        return <Fragment>
            <Tabs value={tabIndex} fullWidth={true}>
                <Tab value={0} label={"List"} onClick={this.setTabIndex(0)} />
                <Tab value={1} label={"Add"} onClick={this.setTabIndex(1)} />
            </Tabs>
            {this.Switch(tabIndex)}
        </Fragment>
    }
}