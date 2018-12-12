import { RequestHandler } from "express";
export type GetToken = (req: {}) => Promise<string>;
/**
 * TODO
 */
export default (
    getToken: GetToken,
    isBlackListed: (token: string) => Promise<boolean>, 
    ): RequestHandler => {
    return async (req, _res, next) => {
        try {
            if (await isBlackListed(await getToken(req))) {
                next(new Error("Token Blacklisted"));
            }
            next();
        } catch (error) {
            return next(error);
        }
    }
}