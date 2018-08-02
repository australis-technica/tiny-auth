import helmet from "helmet";
import cors from "cors";
import Debug from "./debug";
import errorHandler from "./error-handler";
import auth from "./auth";
import { Express } from "express-serve-static-core";
import configureCrud from "./configure-crud";
import fingerPrint from "@australis/tiny-auth-express-fingerprint";
import { validateHandler as validateLicense } from "./lic";
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
            /** Middleware */
            app.use(cors({
                origin: process.env.CORS_ORIGIN || "*"
            }));
            app.use(helmet())
            app.use(fingerPrint);
            /** Handlers */
            if (isDev) {
                app.get("/echo", (req, res) => res.send(req.query.what || "...echo!"));
            }
            const { authorize, requireRole } = auth.middleware;
            app.post("/auth/login", auth.controllers.login);
            app.get("/auth/refresh", authorize, auth.controllers.refresh)
            app.get("/auth/profile", authorize, auth.controllers.getProfile);
            app.post("/auth/change-password", authorize, requireRole(['admin']), auth.controllers.changePassword);
            app.get("/api/v1/validate", validateLicense());
            configureCrud(app);
            // Errors
            app.use(errorHandler);
            return resolve();
        } catch (error) {
            debug(error);
            return reject(error);
        }
    })
}