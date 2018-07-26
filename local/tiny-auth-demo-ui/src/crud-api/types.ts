/**
 * 
 */
export type CrudApiArgs = {
    params?: string[],
    query?: {},
    body?: {},
    method: "GET" | "PUT" | "POST" | "DEL",
    resultKey?: string;
}
/**
 * 
 */
export type CrudApi = (args: CrudApiArgs) => Promise<any>;