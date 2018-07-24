import { ErrorRequestHandler } from "express-serve-static-core";
import { isNumber } from "util";
/** */
const errorHandler: ErrorRequestHandler = (error: Error & { code?: number }, _req, res, next) => {
    console.error(error);
    if (error) {
        res.statusMessage = error.message;
        return res.status(isNumber(error.code) ? error.code :  500).end();
    }
    return next();
};
/** */
export default errorHandler;