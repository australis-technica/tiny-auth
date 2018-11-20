import jwt from "jsonwebtoken";
import { getSecret, defaultOptions } from "./options";
import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);
/**
 *
 */
export interface Verified {
  profile?: {
    // ....
  };
  token?: any;
  iss?: any;
  ips?: any;
  ua?: any;
  fingerprint?: any;
}
import { DefaultOptions } from "./types";
/**
 *
 */
export default function validate(
  token: string,
  expected: DefaultOptions & { fingerprint?: string } = defaultOptions
) {
  expected = Object.assign({}, defaultOptions, expected || {});
  const secret = getSecret(expected);
  try {
    const verified: Verified = jwt.verify(token, secret) as any;
    /**
     * issuer
     */
    if (verified.iss && expected && verified.iss !== expected.iss) {
      debug("jwt:iss: %s, no match", verified.iss);
      throw Object.assign(new Error("jwt: iss, no match"), { code: 401 });
    }
    /**
     * if token has fingerprint, compare
     */
    if (
      verified.fingerprint &&
      expected &&
      verified.fingerprint !== expected.fingerprint
    ) {
      debug("jwt:error:fingerprint: %s", verified.fingerprint);
      throw Object.assign(new Error("jwt:error: fingerprint, mo match"), {
        code: 401
      });
    }
    return verified;
  } catch (error) {
    debug(error);
    throw error;
  }
}