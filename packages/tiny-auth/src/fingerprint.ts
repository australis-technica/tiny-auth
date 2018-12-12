import { Request } from "express";
/**
 *
 * @param req
 */
export default function createHash(req: Request): string {
  // TODO: hash
  const ua = req.headers["user-agent"];
  return new Buffer([ua, req.ip].concat(req.ips).join("|")).toString("hex") ;
}

