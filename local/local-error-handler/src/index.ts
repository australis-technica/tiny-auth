import { ErrorRequestHandler } from "express";
import { isNumber } from "util";
/** */
export default (): ErrorRequestHandler => {
    /** */
    return (error: Error & { code?: number }, _req, res, next) => {
        console.error(error);
        if (error) {
            res.statusMessage = error.message;
            return res.status(isNumber(error.code) ? error.code : 500).end();
        }
        return next();
    }
};