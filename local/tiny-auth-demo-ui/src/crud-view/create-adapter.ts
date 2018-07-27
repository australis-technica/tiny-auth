import viewStore from "../view-store";
import { CrudViewState } from "./types";
/**
 * 
 */
export default function (viewName: string) {
    /**
     *
     */
    const defaultState: CrudViewState = {
        busy: false,
        isMenuOpen: false,
        confirmAction: undefined,
    };
    /**
     *
     */
    const storeAdapter = viewStore(viewName, defaultState, {
        persist: {
            transform: {
                onLoad: (state: Partial<CrudViewState>) => {
                    const {
                        busy,
                        isMenuOpen,
                        confirmAction,
                        ...value
                    } = state;
                    return value;
                },
                onSave: (state: Partial<CrudViewState>) => {
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
