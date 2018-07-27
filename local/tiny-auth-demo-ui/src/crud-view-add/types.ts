import { Message } from "../messages";
/** */
export interface AddViewState {
    busy: boolean;
    isMenuOpen: boolean;
    tabIndex: number;
    confirmAction?: string;
    error?: string;
}
export interface AddViewActions {
    setState(payload: Partial<AddViewState>): any;
    setMessage(message: Message): any;
    clearMessage(): any;
    setConfirmAction(confirmAction: string): any;
    handleActionToConfirm(onOk: () => any, onCancel?: () => any): (...args: any[]) => any;
    setError(error: string | Error): any;
    setSuccess(message: string | undefined): any;
    setBusy(busy: boolean): any;
    delay(n: number): Promise<void>;
    openMenu(): any,
    closeMenu(): any,
    handleMenuAction(action: () => any): () => any
}