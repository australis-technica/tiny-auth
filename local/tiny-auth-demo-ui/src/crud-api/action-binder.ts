import actions from "./actions";
import { Dispatch } from "redux";
import { CrudApiArgs, CrudApiActions } from "./types";
/** */
export default function actionBinder(storeKey: string) {
    const a = actions(storeKey);
    const { fetch, clearError, clearResult, setResult, setBusy, setError, clearSuccess } = a;
    return function bindActions(dispatch: Dispatch): CrudApiActions {
        return {
            fetch: (payload: CrudApiArgs) => dispatch(fetch(payload)),
            clearError: () => dispatch(clearError()),
            clearResult: () => dispatch(clearResult()),
            clearSuccess: () => dispatch(clearSuccess()),
            setBusy: (busy: boolean) => dispatch(setBusy(busy)),
            setError: (error: string | Error) => dispatch(setError(error)),
            setResult: (data: any) => dispatch(setResult(data)),
        }
    }
}