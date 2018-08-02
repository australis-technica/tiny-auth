import { RequestHandler } from "express-serve-static-core";
import sign from "./sign";
import createRequest from "./create-request";
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
export default function createMiddleware(options: Options = {}) {
    options = { ...defaultOptions, ...options }
    return ((req, _res, next) => {
        // re-shape body
        try {
            const { features, exp, ...body } = req.body;
            // exp = number
            const token = sign(createRequest({ token_id: body.id, exp }), features);
            req.body = {
                ...body,
                token,
                features: JSON.stringify(features),
                exp: new Date(exp)
            }
            next();
        } catch (error) {
            return next(error);
        }
    }) as RequestHandler
}