import { debugModule } from "@australis/create-debug";
import { GetToken, TokenBlackList } from "@australis/tiny-auth-core";
import { fingerPrint } from "@australis/tiny-auth-express-fingerprint";
import { signToken } from "@australis/tiny-auth-token-sign";
import { RequestHandler } from "express-serve-static-core";
const debug = debugModule(module);
/** */
export default function refresh(
  geToken: GetToken,
  blacklist: TokenBlackList
): RequestHandler {
  /** */
  return async (req, res, next) => {
    try {
      const token = await geToken(req);
      if (await blacklist.isBlackListed(token)) {
        return next(new Error("Invalid Token (blacklisted)"));
      }
      const fingerprint = fingerPrint(res);
      const signed = await signToken({ profile: req.user, fingerprint });
      await blacklist.add(token);
      return res.status(200).json(signed);
    } catch (error) {
      debug(error);
      return next(Object.assign(error, { code: 401 }));
    }
  };
}
