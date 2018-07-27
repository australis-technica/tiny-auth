import viewStore from "../view-store";
/**
 *
 */
const defaultState = {
  busy: false,
  isMenuOpen: false,
  tabIndex: 0
};
/**
 *
 */
export type ViewState = typeof defaultState;
/**
 *
 */
const storeAdapter = viewStore("customers-add", defaultState, {
  persist: {
    transform: {
      onLoad: (state: Partial<ViewState>) => {
        const { busy, isMenuOpen, ...value } = state;
        return value;
      },
      onSave: (state: Partial<ViewState>) => {
        const { busy, isMenuOpen, ...value } = state;
        return value;
      }
    }
  }
});
export default storeAdapter;
