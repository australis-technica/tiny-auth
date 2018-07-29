import { MessageActions } from "../messages";
/** */
export interface CrudViewState {
    busy: boolean;
    isMenuOpen: boolean;
    confirmAction?: string;
    error?: string;
}
export interface CrudViewActions extends MessageActions{
    setState(payload: Partial<CrudViewState>): any;
    setConfirmAction(confirmAction: string): any;
    handleActionToConfirm(onOk: () => any, onCancel?: () => any): (...args: any[]) => any;    
    setBusy(busy: boolean): any;
    delay(n: number): Promise<void>;
    openMenu(): any,
    closeMenu(): any,
    handleMenuAction(action: () => any): () => any
}