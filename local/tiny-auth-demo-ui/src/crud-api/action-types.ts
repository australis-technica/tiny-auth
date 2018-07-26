export default function (endpoint: string) {
    const FETCH = `crud-api-fetch-${endpoint}`;
    const ERROR = `crud-api-error-${endpoint}`;
    const BUSY = `crud-api-busy-${endpoint}`;
    const RESULT = `crud-api-set-${endpoint}`;
    return {
        BUSY,
        ERROR,
        FETCH,
        RESULT
    }
}