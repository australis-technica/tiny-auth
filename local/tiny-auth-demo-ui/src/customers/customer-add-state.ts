import viewStore from "../view-store";
import { MessageStatus } from "../snackbar-content-with-satus";
/**
 *
 */
export interface ViewState {
  busy: boolean;
  isMenuOpen: boolean;
  tabIndex: number;
  actionToConfirm?: string;
  actionToConfirmResult?: string;
  actionToConfirmResultStatus?: MessageStatus,
  error?: string;
}
/**
 *
 */
const defaultState: ViewState = {
  busy: false,
  isMenuOpen: false,
  tabIndex: 0,
  actionToConfirm: undefined,
};
/**
 *
 */
const storeAdapter = viewStore("customers-add", defaultState, {
  persist: {
    transform: {
      onLoad: (state: Partial<ViewState>) => {
        const {
          busy,
          isMenuOpen,
          actionToConfirm,
          actionToConfirmResult,
          actionToConfirmResultStatus,
          ...value
        } = state;
        return value;
      },
      onSave: (state: Partial<ViewState>) => {
        const {
          busy,
          isMenuOpen,
          actionToConfirm,
          actionToConfirmResult,
          actionToConfirmResultStatus,
          ...value
        } = state;
        return value;
      }
    }
  }
});
export default storeAdapter;
