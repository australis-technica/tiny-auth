import crypto from "crypto";
import { SignRequest } from "./types";
import secret from "./secret";
import issuer from "./issuer"
/**
 * 
 */
export default function createRequest(payload: { exp: Date, token_id: string, aud?: string, validator?: string }): SignRequest {
    const { token_id, exp, aud, validator, } = payload;
    const hostname = issuer();
    const port = process.env.PORT;
    return Object.assign({}, {
        expiresIn: Math.floor(((new Date(exp).valueOf() - Date.now()) / 1000)),
        /**
         * internal identifier
         */
        token_id: token_id || crypto.randomBytes(8).toString("hex"),
        /**
         * Issuer
         */
        iss: hostname,
        /**
         * internal.name.or.namespace.name.or.fully.qualified.client.app.name?
         */
        aud: aud || "*",
        /**
         * validator: "http://localhost:5000/validate"
         */
        validator: validator || `https://${hostname}:${port}/validate`,
        /**
         * secret: enc-key 
         */
        secret: secret(),
    });
}