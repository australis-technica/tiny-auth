import * as jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import { getSecret, defaultOptions } from "./options";
import isStringNotEmpty from "./is-string-notempty";
import { DefaultOptions } from "./types";
/** */
export default function sign(
  extra: {},
  options: DefaultOptions = defaultOptions
) {
  options = Object.assign({}, defaultOptions, options || {});
  //
  const secret = getSecret(Object.assign({}, defaultOptions, options));
  if (!isStringNotEmpty(secret)) {
    throw new Error(
      "Missing Secret from env, or options.envKey Or options.secret"
    );
  }
  //
  const timeToExpire = options.timeToExpire;
  const now = Date.now();
  // JWT options
  const signOptions: SignOptions = {
    // expiresIn: passed exp as payload!
  };
  const payload = {
    exp /*seconds*/:
      Math.floor(now / 1000 /* seconds from epoc */) +
      /*timeToExpire:*/ timeToExpire,
    iat: now,
    iss: options.iss,
    ...extra
  };
  /** */
  const signed = {
    token: jwt.sign(payload, secret, signOptions)
  };
  return signed;
}
