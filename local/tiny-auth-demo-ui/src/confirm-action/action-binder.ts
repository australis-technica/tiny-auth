import { Dispatch, AnyAction } from "redux";
/**
 * 
 * @param setState 
 */
export default function <S extends {}, TK extends keyof S & string>(
    setState: (state: Partial<S>) => AnyAction,
    key: TK
) {

    return (dispatch: Dispatch) => {

        const removeActionToConfirm = () => {
            dispatch(setState({ [key]: undefined } as Partial<S>));
        }

        const handleActionToConfirm = (onOk?: () => any, onCancel?: () => any, ) => {
            return (ok: boolean) => {
                removeActionToConfirm();
                if (ok) {
                    onOk && onOk();
                } else {
                    onCancel && onCancel();
                }
            }
        }
        const setConfirmAction = (confirmAction: string) => {
            if (!confirmAction) {
                throw new Error("Nothing to Confirm");
            }
            return () => dispatch(setState({ [key]: confirmAction } as any));
        }
        return {
            setConfirmAction,
            handleActionToConfirm,
            removeActionToConfirm
        }
    }
}