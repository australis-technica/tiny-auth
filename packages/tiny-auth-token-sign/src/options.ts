import isStringNotEmpty from "./is-string-notempty";
import { DefaultOptions } from "./types";
import os from "os";
/** */
const ENV_KEY = "SECRET";
export const defaultOptions: DefaultOptions = {
    envKey: ENV_KEY,
    secret: undefined,
    /** in seconds from NOW, as time-lapse, as in 60 Seconds */
    timeToExpire: 60 * 60, // 1hr ?
    iss: process.env.AUITH_ISS || os.hostname()
}
/** */
export function getSecret (options: DefaultOptions){
    return isStringNotEmpty(options.secret) ? options.secret : process.env[(options.envKey || ENV_KEY)];

}