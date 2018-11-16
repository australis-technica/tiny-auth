import { RequestHandler } from "express";
import { sign } from "@australis/tiny-licenseware";
/** */
export interface Options {
  // TODO:
}
const defaultOptions: Options = {
  // TODO:
};
/**
 * Middleware
 */
export default function signMiddleware(
  options: Partial<Options> = defaultOptions,
) {
  const {
    /**/
  } = { ...defaultOptions, ...(options || defaultOptions) };
  return ((req, _res, next) => {
    // re-shape body
    try {
      const { features, ...body } = req.body;
      const signed = sign({ token_id: body.id, exp: body.exp, features });
      req.body = {
        ...body,
        token: signed.token,
        features: JSON.stringify(features),
        exp: new Date(signed.exp),
      };
      next();
    } catch (error) {
      return next(error);
    }
  }) as RequestHandler;
}
