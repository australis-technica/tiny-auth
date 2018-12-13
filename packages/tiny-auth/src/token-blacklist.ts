import { RequestHandler } from "express";
import { GetToken, Blacklist } from "./types";
/**
 * Creates Middleware
 */
export default (
    getToken: GetToken,
    blacklist: Blacklist | undefined,
): RequestHandler => {
    /**
     * Middleware
     */
    return async (req, _res, next) => {
        try {
            if (!blacklist) {
                return next();
            }
            const x = await blacklist.findOne(await getToken(req));
            if (x) {
                next(new Error("Token Blacklisted"));
            }
            next();
        } catch (error) {
            return next(error);
        }
    }
}