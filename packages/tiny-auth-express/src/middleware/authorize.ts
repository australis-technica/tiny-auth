import { GetToken } from "@australis/tiny-auth-core";
import { RequestHandler } from "express-serve-static-core";
import jwt from "jsonwebtoken";
import os from "os";
/** */
export default function authorize(getToken: GetToken): RequestHandler {
  /** */
  return async (req, res, next) => {
    try {
      const { profile, token, iss } = jwt.verify(
        await getToken(req),
        process.env.SECRET
      ) as { profile: {}; token: any , iss: any };
      /**
       * issuer
       */
      if(iss && iss!== (process.env.AUTH_ISSUER || os.hostname())) {
        return next(Object.assign(new Error("jwt: iss, error"), { code: 401}))
      }
      res.locals.token = token;
      req.user = profile;
      return next();
    } catch (error) {
      return next(Object.assign(error, { code: 401 }));
    }
  };
}
