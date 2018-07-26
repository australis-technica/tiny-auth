import isStringNotEmpty from "./is-string-notempty";
/** */
export interface DefaultOptions {
    envKey?: string;
    secret?: string;
    /** in seconds from NOW, as time-lapse, as in 60 Seconds */
    timeToExpire?: number;
    iss?: string;
    aud?: string;
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
export function getSecret (options: DefaultOptions){
    return isStringNotEmpty(options.secret) ? options.secret : process.env[(options.envKey || ENV_KEY)];

}