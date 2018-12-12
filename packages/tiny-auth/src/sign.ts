import jwt from "jsonwebtoken";
/** */
export default function Sign(
  secret: any,
  timeToExpire: number | undefined,
  issuer: string | undefined,
  audience: string | undefined,
) {
  // Signer
  return (extra: {}) => {
    if (!secret) {
      throw new Error(
        "Missing Secret from env, or options.envKey Or options.secret"
      );
    }
    //  
    const now = Date.now();
    timeToExpire = timeToExpire || (60 * 60); // 1hr ?
    const payload = {
      exp /*seconds*/:
        Math.floor(now / 1000 /* seconds from epoc */) +
      /*timeToExpire:*/ timeToExpire,
      // iss: issuer,
      iat: now,
      ...extra
    };
    /** */
    const signed = {
      token: jwt.sign(payload, secret, { issuer, audience })
    };
    return signed;
  }
}