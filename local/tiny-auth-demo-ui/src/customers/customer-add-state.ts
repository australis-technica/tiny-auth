import viewStore from "../view-store";
/**
 *
 */
export interface ViewState {
  busy: boolean;
  isMenuOpen: boolean;
  tabIndex: number;
  actionToConfirm?: string;
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
          ...value
        } = state;
        return value;
      },
      onSave: (state: Partial<ViewState>) => {
        const {
          busy,
          isMenuOpen,
          actionToConfirm,          
          ...value
        } = state;
        return value;
      }
    }
  }
});
export default storeAdapter;
