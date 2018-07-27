import actions from "./actions";
import { Dispatch } from "redux";
import { CrudApiArgs, CrudApiActions } from "./types";
/**
 * 
 * @param endpoint 
 */
export default function actionBinder(endpoint: string){
    const a = actions(endpoint);
    const { fetch, clearError, clearResult, setResult, setBusy, setError} = a;
    return function bindActions(dispatch: Dispatch): CrudApiActions {        
        return {
            fetch: (payload: CrudApiArgs )=> dispatch(fetch(payload)),
            setResult: (data: any)=> dispatch(setResult(data)),
            clearError: ()=> dispatch(clearError()),
            clearResult: ()=> dispatch(clearResult()),
            setBusy: (busy: boolean)=> dispatch(setBusy(busy)),
            setError: (error: string|Error)=> dispatch(setError(error))
        }
    }
}