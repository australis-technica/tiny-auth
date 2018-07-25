import { RequestHandler } from "express-serve-static-core";
/**
 * TODO
 */
export default function FingerPrint(): RequestHandler {
    /**
     * 
     */
    return function fingerPrint(req,res, next) {
        try {
            const ips = (req.ips||[]).concat([req.ip]).join(",");
            const ua  = req.headers["user-agent"];
            res.locals.fingerPrint({
                ips,
                ua
            });
            next();
        } catch(error) {
            return next(error);
        }
    }
}