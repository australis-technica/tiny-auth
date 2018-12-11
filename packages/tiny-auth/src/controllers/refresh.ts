import { debugModule } from "@australis/create-debug";

import { fingerPrint } from "../fingerprint";
import { signToken } from "../token-sign";
import { RequestHandler } from "express";
const debug = debugModule(module);

export type GetToken = (req: {}) => Promise<string>;
/** */
export default function refresh(
  geToken: GetToken,
  isBlackListed: (token: string) => Promise<Boolean>,
  add: (toke: string) => Promise<any>
): RequestHandler {
  /** */
  return async (req, res, next) => {
    try {
      const token = await geToken(req);
      if (await isBlackListed(token)) {
        return next(new Error("Invalid Token (blacklisted)"));
      }
      const fingerprint = fingerPrint(res);
      const signed = await signToken({ profile: (req as any).user, fingerprint });
      await add(token);
      return res.status(200).json(signed);
    } catch (error) {
      debug(error);
      return next(Object.assign(error, { code: 401 }));
    }
  };
}
