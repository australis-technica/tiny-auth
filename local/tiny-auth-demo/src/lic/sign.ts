
import jwt from "jsonwebtoken";
import { LicRequest } from "./types";
/**
 * 
 * @param req 
 */
export default function sign<T extends LicRequest>(req: T, features: {} = {}) {
    //
    const conflicts = Object.keys(features).filter(k => Object.keys(req).indexOf(k) !== -1);
    /** */
    if (conflicts && conflicts.length > 0) {
        throw new Error(`Lic Request/Feature conflict: ${conflicts.join(", ")}`);
    }
    const { timeToExpire, iss, aud, validator, secret } = req as any;
    // ...
    const payload = {
        iat: Date.now(),
        /**
         * expressed in seconds to expire from iat
         * https://github.com/auth0/node-jsonwebtoken#token-expiration-exp-claim
         */
        exp:
            Math.floor(
                Date.now() / 1000 // seconds from epoc
            ) + /*timeToExpire:*/ timeToExpire, // seconds                  
        // ...
        iss,
        aud,
        validator,
        ...features
    }
    return jwt.sign(payload, secret);
}