import jwt, { SignOptions } from "jsonwebtoken";
import { defaultOptions, getSecret } from "./options";
import { DefaultOptions } from "./types";
/** */
export default function sign(
  extra: {},
  options: DefaultOptions = defaultOptions
) {
  options = Object.assign({}, defaultOptions, options || {});
  //
  const secret = getSecret(Object.assign({}, defaultOptions, options));
  if (!secret) {
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
