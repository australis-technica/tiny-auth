export default function (storeKey: string) {
    const FETCH = `@${storeKey}/fetch`;
    const CLEAR_ERROR = `@${storeKey}/clear-error`;
    const CLEAR_SUCCESS = `@${storeKey}/clear-success`;
    const SET_BUSY = `@${storeKey}/set-busy`;
    const SET_RESULT = `${storeKey}/set-result`;
    const CLEAR_RESULT = `${storeKey}/clear-result`;
    const SET_ERROR = `@${storeKey}/set-error`;
    return {
        CLEAR_ERROR,
        CLEAR_RESULT,
        CLEAR_SUCCESS,
        SET_BUSY,
        SET_ERROR,
        FETCH,
        SET_RESULT
    }
}