import { RequestHandler } from "express-serve-static-core";
import sign from "./sign";
import createRequest from "./create-request";
// import { MIN_TIME_TO_EXPIRE } from "./constants";
export interface Options {
    // TODO:
}
const defaultOptions: Options = {};
/**
 * 
 */
export default (options: Options = {}) => {
    options = { ...defaultOptions, ...options }
    return ((req, _res, next) => {
        // re shape body
        try {
            const { features, exp, ...body } = req.body;
            // in seconds to expire
            // const timeToExpire = (new Date(exp as number).getTime() - Date.now()) / 1000;
            // console.log("timeToExpire: %s", timeToExpire);
            // if (timeToExpire < MIN_TIME_TO_EXPIRE) {
            //     return next(new Error("timeToExpire: too short"))
            // }
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