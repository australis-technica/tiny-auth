import fingerPrint from "@australis/tiny-auth-express-fingerprint";
import { Express } from "express-serve-static-core";
import auth from "./auth";
import Debug from "./debug";
const debug = Debug(__filename);
const isDev = process.env.NODE_ENV !== "production";
/**
 * 
 * @param app 
 */
export default function configure(app: Express) {
    /** */
    return new Promise((resolve, reject) => {
        try {
            app.use(fingerPrint);
            /** Handlers */
            if (isDev) {
                app.get("/echo", (req, res) => res.send(req.query.what || "...echo!"));
            }
            const { authorize, requireRole } = auth.middleware;
            /** Configure Auth */
            app.post("/auth/login", auth.controllers.login);
            app.get("/auth/refresh", authorize, auth.controllers.refresh)
            app.get("/auth/profile", authorize, auth.controllers.getProfile);
            app.post("/auth/change-password", authorize, requireRole(['user']), auth.controllers.changePassword);

            debug("configured");
            return resolve();
        } catch (error) {
            debug(error);
            return reject(error);
        }
    })
}