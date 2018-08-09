import crypto from "crypto";
import { SignRequest } from "./types";
import secret from "./secret";
import issuer from "./issuer";
import validatorUrl from "./validator-url";
/**
 *
 */
export default function createRequest(payload: {
  exp: Date;
  token_id: string;
  aud?: string;
  validator?: string;
  iss?: string;
}): SignRequest {
  const { token_id, exp, aud, validator, iss } = payload;  
  return Object.assign(
    {},
    {
      expiresIn: Math.floor((new Date(exp).valueOf() - Date.now()) / 1000),
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
    }
  );
}
