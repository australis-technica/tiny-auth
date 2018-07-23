import * as jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import { getSecret, defaultOptions, DefaultOptions } from "./options";
import isStringNotEmpty from "./is-string-notempty";
/** */
export default function sign(extra: {}, options?: DefaultOptions) {
    //
    const secret = getSecret(Object.assign({}, defaultOptions, options));
    if (!isStringNotEmpty(secret)) {
        throw new Error("Missing Secret from env, or options.envKey Or options.secret");
    }
    //
    const timeToExpire = options.timeToExpire;    
    //
    const now = Date.now();
    const exp =  Math.floor(
        now / 1000 // seconds from epoc
      ) + /*timeToExpire:*/ timeToExpire; // seconds        
    /** */
    const signed = {
        token: jwt.sign( // ...
            {
                ...extra,
                // 
                exp,
                iat: now
            },
            secret,
            {
                // expiresIn
            } as SignOptions),
    };
    return signed;
}
