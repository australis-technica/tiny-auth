import viewStore from "../view-store";
/**
 *
 */
export interface ViewState {
  busy: boolean;
  isMenuOpen: boolean;
  tabIndex: number;
  actionToConfirm?: string;
  actionToConfirmTitle?: string,
  actionToConfirmMessage?: string;
}
/**
 *
 */
const defaultState: ViewState = {
  busy: false,
  isMenuOpen: false,
  tabIndex: 0,
  actionToConfirm: undefined,
  actionToConfirmTitle: undefined,
  actionToConfirmMessage: undefined
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
          actionToConfirmTitle,
          actionToConfirmMessage,
          ...value
        } = state;
        return value;
      },
      onSave: (state: Partial<ViewState>) => {
        const {
          busy,
          isMenuOpen,
          actionToConfirm,
          actionToConfirmTitle,
          actionToConfirmMessage,
          ...value
        } = state;
        return value;
      }
    }
  }
});
export default storeAdapter;
