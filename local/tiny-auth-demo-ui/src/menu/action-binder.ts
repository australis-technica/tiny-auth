import { Dispatch, AnyAction } from "redux";
/**
 * 
 * @param setState 
 * @param key 
 */
export default function actionBinder<S extends {}, K extends keyof S & string>(setState: (state: Partial<S>) => AnyAction, key: K) {
    /**
     * 
     */
    return function bindActions(dispatch: Dispatch) {
        const openMenu = () => dispatch(setState({ [key]: true } as any));
        const closeMenu = () => dispatch(setState({ [key]: false } as any));
        const handleMenuAction = (action: () => any) => {
            return () => {
                closeMenu();
                action();
            };
        };
        return {
            openMenu,
            closeMenu,
            handleMenuAction
        }
    }
}