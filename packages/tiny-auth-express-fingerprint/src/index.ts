import { Request, RequestHandler } from "express-serve-static-core";
import crypto from "crypto";
/**
 *
 * @param req
 */
function createHash(req: Request) {
  const ua = req.headers["user-agent"];
  return crypto
    .createHash("md5")
    .update([ua, req.ip].concat(req.ips).join("|"));
}
/**
 *
 */
export function fingerPrint(res: { locals: { [key: string]: any } }) {
  return res && res.locals && typeof res.locals.fingerPrint  === "string" && 
    (res.locals.fingerPrint) || "";
}
/* prettier-ignore */
/**
 * TODO
 */
export default (function fingerPrint(req, res, next) {
  try {    
    res.locals.fingerPrint = createHash(req);
    next();
  } catch (error) {
    return next(error);
  }
} )as RequestHandler
