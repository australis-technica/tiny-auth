/** */
export interface DefaultOptions {
    envKey?: string;
    secret?: string;
    /** in seconds from NOW, as time-lapse, as in 60 Seconds */
    timeToExpire?: number;
}
/** */
const ENV_KEY = "SECRET";
export const defaultOptions: DefaultOptions = {
    envKey: ENV_KEY,
    secret: undefined,
    /** in seconds from NOW, as time-lapse, as in 60 Seconds */
    timeToExpire: 60 * 60 // 1hr ?
}
/** */
function isString(x: any): x is string {
    return typeof x === "string";
}
/** */
export function getSecret (options: DefaultOptions){
    return isString(options.secret) ? options.secret : process.env[(options.envKey || ENV_KEY)];

}