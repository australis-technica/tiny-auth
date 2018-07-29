import { MessageActions } from "../messages";
import { ConfirmActionActions } from "../confirm-action";
/** */
export interface CrudViewState {
    busy: boolean;
    isMenuOpen: boolean;
    confirmAction?: string;
    error?: string;
}
export type CrudViewActions<T extends CrudViewState = CrudViewState> =  MessageActions & ConfirmActionActions & {
    setState(payload: Partial<T>): any;
    setBusy(busy: boolean): any;
    delay(n: number): Promise<void>;
    openMenu(): any,
    closeMenu(): any    
    handleMenuAction(action: () => any): () => any;
}