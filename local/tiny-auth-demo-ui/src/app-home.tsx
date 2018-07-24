import * as React from "react";
import { Component } from "react";
import { Tabs, Tab } from "@material-ui/core";
import { CustomersView } from "./customers";
import { ProductsView } from "./products";
import { LicensesView } from "./licenses";
/**
 * 
 */
export interface HomeProps {

}
/**
 * 
 */
export default class Home extends Component<HomeProps> {
    state = {
        tabIndex: 0
    }
    setTabIndex = (tabIndex: number) => {
        return () => {
            this.setState({ tabIndex });
        }
    }
    /**
     * 
     */
    renderTab = (tabIndex: number) => {
        switch (tabIndex) {
            case 0: {
                return <CustomersView />
            }
            case 1: {
                return <ProductsView />
            }
            case 2: {
                return <LicensesView />
            }
            default: {
                return null;
            }
        }
    }
    /**
     * 
     */
    render() {
        const { tabIndex } = this.state;
        return <React.Fragment>
            <Tabs title="Tabs" value={tabIndex} fullWidth>
                <Tab tabIndex={0} title="Customers" label="Customers" onClick={this.setTabIndex(0)} />
                <Tab tabIndex={1} title="Products" label="Products" onClick={this.setTabIndex(1)} />
                <Tab tabIndex={2} title="Licenses" label="Licenses" onClick={this.setTabIndex(2)} />
            </Tabs>
            {this.renderTab(tabIndex)}
        </React.Fragment>
    }
}