import { GetToken } from "@australis/tiny-auth-core";
import { RequestHandler } from "express-serve-static-core";
import jwt from "jsonwebtoken";
import os from "os";
import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);
/** */
export default function authorize(getToken: GetToken): RequestHandler {
  /** */
  return async (req, _res, next) => {
    try {
      const { profile, iss, ips, ua } = jwt.verify(
        await getToken(req),
        process.env.SECRET
      ) as { profile: {}; token: any , iss: any , ips: any, ua: any};
      /**
       * issuer
       */
      if(iss && iss!== (process.env.AUTH_ISSUER || os.hostname())) {
        return next(Object.assign(new Error("jwt: iss, no match"), { code: 401}))
      }
      let found = (req.ips||[]).concat([req.ip]).join(",");
      if(ips !== found){
        debug("jwt:error: %s", found);
        return next(Object.assign(new Error("jwt: ips, mo match"), { code: 401}))
      }
      found = req.headers["user-agent"].toString();
      if(ua!== found) {
        debug("jwt:error: %s", found);
        return next(Object.assign(new Error("jwt: ua, no match"), { code: 401}))
      }
      req.user = profile;
      return next();
    } catch (error) {
      return next(Object.assign(error, { code: 401 }));
    }
  };
}
