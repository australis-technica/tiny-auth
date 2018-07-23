import * as jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import { getSecret, defaultOptions, DefaultOptions } from "./options";
import isStringNotEmpty from "./is-string-notempty";
/** */
export default function sign(extra: {}, options?: DefaultOptions) {
    const secret = getSecret(Object.assign({}, defaultOptions, options))
    if (!isStringNotEmpty(secret)) {
        throw new Error("Missing Secret from env, or options.envKey Or options.secret");
    }
    const d = new Date();
    const minutes = 1; // 60;
    const expiresIn = (((d.getTime()) + (minutes * 60 * 1000)) - (d.getTime() - d.getMilliseconds()) / 1000);
    const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(expiresIn);    
    /** */
    const signed = {
        token: jwt.sign( // ...
            extra,
            secret,
            {
                expiresIn
            } as SignOptions),
    };
    return signed;
}
