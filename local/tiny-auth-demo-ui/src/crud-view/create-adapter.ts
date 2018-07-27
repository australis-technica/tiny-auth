import viewStore from "../view-store";
import { AddViewState } from "./types";
/**
 * 
 */
export default function (viewName: string) {
    /**
     *
     */
    const defaultState: AddViewState = {
        busy: false,
        isMenuOpen: false,
        tabIndex: 0,
        confirmAction: undefined,
    };
    /**
     *
     */
    const storeAdapter = viewStore(viewName, defaultState, {
        persist: {
            transform: {
                onLoad: (state: Partial<AddViewState>) => {
                    const {
                        busy,
                        isMenuOpen,
                        confirmAction,
                        ...value
                    } = state;
                    return value;
                },
                onSave: (state: Partial<AddViewState>) => {
                    const {
                        busy,
                        isMenuOpen,
                        confirmAction,
                        ...value
                    } = state;
                    return value;
                }
            }
        }
    });
    // 
    return storeAdapter;
};
