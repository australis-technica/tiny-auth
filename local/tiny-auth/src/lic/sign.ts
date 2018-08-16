import crypto from "crypto";
import secret from "./secret";
import issuer from "./issuer";
import validatorUrl from "./validator-url";
import jwt from "jsonwebtoken";
/**
 * In Milliseconds
 */
const ONE_HOUR = 60 * 60 * 1000;
/** */
export type Sign = (req: { exp: Date; token_id: string; aud?: string; validator?: string; iss?: string; features: {}; }) => {
    token: string,
    exp: any
};
/**
 * 
 * @param req 
 */
const sign: Sign = ({ exp, token_id, aud, validator, iss, features }) => {

    const now = Date.now();
    const date = new Date(exp);
    const expiresIn = date.getTime() - now;
    if (expiresIn < ONE_HOUR) {
        throw new Error("Invalid expiration Date, must greater/equal than 'now' + 1hour");
    }
    const req = {
        expiresIn: `${expiresIn}`,
        /**
         * internal identifier
         */
        token_id: token_id || crypto.randomBytes(8).toString("hex"),
        /**
         * Issuer
         */
        iss: iss || issuer(),
        /**
         * internal.name.or.namespace.name.or.fully.qualified.client.app.name?
         */
        aud: aud || "*",
        /**
         * validator: "http://localhost:5000/validate"
         */
        validator: validator || validatorUrl(),
        /**
         * secret: enc-key
         */
        secret: secret()
    };
    //
    const conflicts = Object.keys(features).filter(k => Object.keys(req).indexOf(k) !== -1);
    if (conflicts && conflicts.length > 0) {
        throw new Error(`Lic Request/Feature conflict: ${conflicts.join(", ")}`);
    }
    const token = jwt.sign({
        iat: Date.now(),
        exp_date: date.getTime(),
        ...req,
        ...features
    }, secret(), { expiresIn });
    return {
        token,
        ...(jwt.verify(token, secret()) as any)
    };
}
/** */
export default sign;