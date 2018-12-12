import { debugModule } from "@australis/create-debug";
import { RequestHandler } from "express";
import createHash from "./fingerprint";

const debug = debugModule(module);

export type GetToken = (req: {}) => Promise<string>;
/** */
export default function refresh(
  geToken: GetToken,
  isBlackListed: (token: string) => Promise<Boolean>,
  add: (toke: string) => Promise<any>, 
  sign: (a: {})=> any
): RequestHandler {
  /** */
  return async (req, res, next) => {
    try {
      const token = await geToken(req);
      if (await isBlackListed(token)) {
        return next(new Error("Invalid Token (blacklisted)"));
      }
      const fingerprint = createHash(req);
      const signed = await sign({ profile: (req as any).user, fingerprint });
      await add(token);
      return res.status(200).json(signed);
    } catch (error) {
      debug(error);
      return next(Object.assign(error, { code: 401 }));
    }
  };
}
