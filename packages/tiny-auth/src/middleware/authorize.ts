import { debugModule } from "@australis/create-debug";
import { validate } from "../token-sign";
import { RequestHandler } from "express";
import { fingerPrint } from "../fingerprint";
const debug = debugModule(module);
export type GetToken = (req: {})=> Promise<string>;
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
