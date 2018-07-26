import { CrudApiArgs } from "./types";
import actionTypes from "./action-types";
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
        fetch: (payload: CrudApiArgs) => ({
            type: FETCH,
            payload
        }),
        clearError: () => ({
            type: ERROR,
            payload: undefined
        }),
        setError: (payload: string | Error) => ({
            type: ERROR,
            payload
        }),
        setBusy: (payload: boolean) => ({
            type: BUSY,
            payload
        }),
        setResult: (payload: any, meta: Partial<CrudApiArgs>) => ({
            type: RESULT,
            payload,
            meta
        })
    }
}