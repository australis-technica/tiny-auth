import { RequestHandler } from "express-serve-static-core";
import jwt from "jsonwebtoken";
import { GetToken } from "@australis/tiny-auth-core";
/** */
export default function authorize(getToken: GetToken): RequestHandler {
  /** */
  return async (req, res, next) => {
    try {
      const { profile, token } = jwt.verify(
        await getToken(req),
        process.env.SECRET
      ) as { profile: {}; token: any };
      res.locals.token = token;
      req.user = profile;
      return next();
    } catch (error) {
      return next(Object.assign(error, { code: 401 }));
    }
  };
}
