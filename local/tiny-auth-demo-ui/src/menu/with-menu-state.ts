import { Component, ReactNode } from "react";
/** */
export type RenderProps = MenuState & {
    openMenu(): any;
    closeMenu(): any;
    handleMenuAction(action: Function): any;
};
/** */
export interface WithMenuStateProps {
    isOpen?: boolean;
    render(props: RenderProps): ReactNode
}
/** */
export interface MenuState {
    isOpen: boolean
}
/** */
export default class WithMenuState extends Component<WithMenuStateProps, MenuState> {
    /** */
    state = {
        isOpen: !!this.props.isOpen
    }
    /** */
    openMenu = () => {
        this.setState({ isOpen: true });
    }
    /** */
    closeMenu = () => {
        this.setState({ isOpen: false });
    }
    /** */
    handleMenuAction = (action: Function) => {
        return () => {
            this.closeMenu();
            action()
        }
    }
    /** */
    render() {
        return this.props.render({ ...this.state, openMenu: this.openMenu, closeMenu: this.closeMenu, handleMenuAction: this.handleMenuAction });
    }
}