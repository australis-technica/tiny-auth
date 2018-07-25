import { RequestHandler } from "express-serve-static-core";
/**
   * ensure
   */
export default function ensureBody(): RequestHandler {
    return (req, _res, next) => {
        try {
            if (!req.body) {
                return next(Object.assign(new Error("Bad Request, body required"), { ode: 400 }));
            }
            return next();
        } catch (error) {
            return next(error);
        }
    }
}