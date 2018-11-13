import { debugModule } from "@australis/create-debug";
import fingerPrint from "@australis/tiny-auth-express-fingerprint";
import { Express } from "express-serve-static-core";
import auth from "./auth";
const debug = debugModule(module);
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
            app.post("/api/auth/login", auth.controllers.login);
            app.get("/api/auth/refresh", authorize, auth.controllers.refresh)
            app.get("/api/auth/profile", authorize, auth.controllers.getProfile);
            app.post("/api/auth/change-password", authorize, requireRole(['user']), auth.controllers.changePassword);
            if (isDev) {
                app.get("/api/auth/echo/:what?", (req, res) => {
                    res.send(req.params.what || req.query.what || "echo...");
                });
            }
            debug("configured");
            return resolve();
        } catch (error) {
            debug(error);
            return reject(error);
        }
    })
}