import { debugModule } from "@australis/create-debug";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import createHash from "./fingerprint";

const debug = debugModule(module);
export type GetToken = (req: {}) => Promise<string>;
interface Verified {
  profile?: {
    // ....
  };
  token?: any;
  iss?: any;
  ips?: any;
  ua?: any;
  fingerprint?: any;
}
/** */
export default function authorize(
  getToken: GetToken,
  getSecret: () => Promise<any>,
  iss: string,
): RequestHandler {
  /** */
  return async (req, _res, next) => {
    try {
      const token = await getToken(req);
      const verified: Verified = jwt.verify(token, await getSecret()) as any;
      if (verified.fingerprint !== createHash(req)) {
        debug("jwt:error:fingerprint: %s", verified.fingerprint);
        throw Object.assign(new Error("jwt:error: fingerprint, mo match"), {
          code: 401
        });
      }
     /**
      * issuer: Already done by Verify 
      */
      if (verified.iss !== iss) {
        debug("jwt:iss: %s, no match", verified.iss);
        throw Object.assign(new Error("jwt: iss, no match"), { code: 401 });
      }
      const { profile } = verified;
      (req as any).user = profile;
      return next();
    } catch (error) {
      debug(error);
      return next(Object.assign(error, { code: 401 }));
    }
  };
}
