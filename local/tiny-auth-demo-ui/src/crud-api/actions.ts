import { CrudApiArgs } from "./types";
import actionTypes from "./action-types";
import { FluxStandardAction } from "flux-standard-action";
console.log("crud-api-actions");
/**
 * Create Actions
 */
export default function (endpoint: string) {

    const { BUSY, FETCH, ERROR, RESULT } = actionTypes(endpoint);
    /**
     * Actions
     */
    return {
        fetch: (payload: CrudApiArgs):FluxStandardAction<CrudApiArgs> => ({
            type: FETCH,
            payload,
            meta: undefined
        }),
        clearError: (): FluxStandardAction<undefined> => ({
            type: ERROR,
            payload: undefined,
            meta: undefined
        }),
        setError: (payload: string | Error): FluxStandardAction<string|Error> => ({
            type: ERROR,
            payload,
            meta: undefined
        }),
        setBusy: (payload: boolean): FluxStandardAction<boolean> => ({
            type: BUSY,
            payload,
            meta: undefined
        }),
        setResult: (payload: any): FluxStandardAction<any> => ({
            type: RESULT,
            payload            ,
            meta: undefined
        }),
        clearResult: (): FluxStandardAction<undefined> => ({
            type: RESULT,
            payload: undefined,
            meta: undefined
        })
    }
}