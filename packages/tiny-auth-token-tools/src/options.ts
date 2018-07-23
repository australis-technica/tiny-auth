/** */
export interface DefaultOptions {
    envKey?: string;
    secret?: string;
}
/** */
const ENV_KEY = "SECRET";
export const defaultOptions: DefaultOptions = {
    envKey: ENV_KEY,
    secret: undefined
}
/** */
function isString(x: any): x is string {
    return typeof x === "string";
}
/** */
export function getSecret (options: DefaultOptions){
    return isString(options.secret) ? options.secret : process.env[(options.envKey || ENV_KEY)];

}