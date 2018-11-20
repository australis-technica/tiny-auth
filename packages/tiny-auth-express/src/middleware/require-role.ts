import { RequestHandler } from "express";
import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);
/** */
const requireRole: (roles: string[]) => RequestHandler = (roles) => (req, _res, next) => {
    try {
        const { user } = req;
        for(const role of roles) {
            const userRoles = user && user.roles.split(',');
            if(!userRoles || userRoles.indexOf(role) === -1){
                return next(new Error(`${role} Role required`));
            }
        }
        return next();
    } catch (error) {
        debug(error);
        return next(Object.assign(error, { code: 401 }));
    }
};
export default requireRole;