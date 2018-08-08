
import jwt from "jsonwebtoken";
import { SignRequest } from "./types";
/**
 * 
 * @param req 
 */
export default function sign(req: SignRequest, features: {} = {}) {
    //
    const conflicts = Object.keys(features).filter(k => Object.keys(req).indexOf(k) !== -1);
    if (conflicts && conflicts.length > 0) {
        throw new Error(`Lic Request/Feature conflict: ${conflicts.join(", ")}`);
    }
    const { expiresIn, iss, aud, validator, secret, token_id } = req;
    const payload = {
        token_id,
        iat: Date.now(),
        iss,
        aud,
        validator,
        ...features
    }
    const signed = jwt.sign(payload, secret, { expiresIn });
    jwt.verify(signed, secret);
    return signed;
}