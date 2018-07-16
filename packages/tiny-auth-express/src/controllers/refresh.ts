import { RequestHandler } from "express-serve-static-core";
import { TokenBlackList, SignToken, GetToken } from "@australis/tiny-auth-core";
import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);
/** */
export default function refresh(geToken: GetToken, sign: SignToken, blacklist: TokenBlackList): RequestHandler {
  /** */
  return async (req, res, next) => {
    try {
      const token = await geToken(req);
      if (await blacklist.isBlackListed(token)) {
        return next(new Error("Invalid Token (blacklisted)"));
      }
      const signed = await sign({ profile: req.user });
      await blacklist.add(token);
      return res.status(200).json(signed);
    } catch (error) {
      debug(error);
      return next(Object.assign(error, { code: 401 }));
    }
  }
}
