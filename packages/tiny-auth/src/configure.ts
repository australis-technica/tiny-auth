import { debugModule } from "@australis/create-debug";
import fingerPrint from "./fingerprint";
import { Express, Router } from "express";
const debug = debugModule(module);
import Auth from "./auth";
/** */
export interface Options {
    prefix: string
}
/**
 * 
 * @param app 
 */
export default (secret: string, options: Options) => <A extends Express | Router>(app: A): A => {
    const auth = Auth(secret);
    const { prefix } = options;
    try {
        app.use(fingerPrint);
        const { authorize, requireRole } = auth.middleware;
        /** Configure Auth */
        app.post(`${prefix}/login`, auth.controllers.login);
        app.get(`${prefix}/refresh`, authorize, auth.controllers.refresh)
        app.get(`${prefix}/profile`, authorize, auth.controllers.getProfile);
        app.post(`${prefix}/change-password`, authorize, requireRole(['user']), auth.controllers.changePassword);
        debug("configured");
        return app;
    } catch (error) {
        debug(error);
        throw error;
    }
}