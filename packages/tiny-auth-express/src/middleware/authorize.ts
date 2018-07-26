import { debugModule } from "@australis/create-debug";
import { GetToken } from "@australis/tiny-auth-core";
import { validate } from "@australis/tiny-auth-token-sign";
import { RequestHandler } from "express-serve-static-core";
import { fingerPrint } from "@australis/tiny-auth-express-fingerprint";
const debug = debugModule(module);
/** */
export default function authorize(getToken: GetToken): RequestHandler {
  /** */
  return async (req, res, next) => {
    try {
      const token = await getToken(req);
      const fingerprint = fingerPrint(res);
      const { profile } = validate(token, { fingerprint });
      req.user = profile;
      return next();
    } catch (error) {
      debug(error);
      return next(Object.assign(error, { code: 401 }));
    }
  };
}
