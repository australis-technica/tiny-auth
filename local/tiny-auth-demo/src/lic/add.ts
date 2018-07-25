import { RequestHandler } from "express-serve-static-core";
import create from "./create-lic-request";
import sign from "./sign";
/**
 * MIDDLEWARE
 */
export default function add(): RequestHandler {
    return (_req, res, next) => {
        try {
            res.locals.lic_token = sign(create({}), res.locals.features);
        }
        catch (error) {
            return next(error)

        }
    }
}