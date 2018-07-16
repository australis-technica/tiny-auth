import { RequestHandler } from "express-serve-static-core";
import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);
/** */
const requireRole: (roles: string[]) => RequestHandler = (roles) => (req, _res, next) => {
    try {
        const { user } = req;
        const found = user.roles.split(',').find((role: string) => roles.indexOf(role) !== -1);
        if (!found) {
            throw new Error("Unauthorized (role)");
        }
        return next();
    } catch (error) {
        debug(error);
        return next(Object.assign(error, { code: 401 }));
    }
};
export default requireRole;