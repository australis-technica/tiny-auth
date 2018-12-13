import { debugModule } from "@australis/create-debug";
import { RequestHandler } from "express";
import createHash from "./fingerprint";
import { Blacklist } from "./types";
import { GetToken } from "./authorize";

const debug = debugModule(module);

/** */
export default function refresh(
  getToken: GetToken,
  sign: (a: {}) => any,
  blacklist: Blacklist | undefined,
): RequestHandler {
  return async (req, res, next) => {
    try {
      const token = await getToken(req);
      const x = blacklist && await blacklist.findOne(token)
      if (blacklist && x) {
        return next(new Error("Invalid Token (blacklisted)"));
      }
      const fingerprint = createHash(req);
      const signed = await sign({ profile: (req as any).user, fingerprint });
      if (blacklist) await blacklist.add(token);
      return res.status(200).json(signed);
    } catch (error) {
      debug(error);
      return next(Object.assign(error, { code: 401 }));
    }
  };
}
