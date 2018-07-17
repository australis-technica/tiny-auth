import helmet from "helmet";
import cors from "cors";
import Debug from "./debug";
import errorHandler from "./error-handler";
import auth from "./auth";
import { Express } from "express-serve-static-core";
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
            /** Handlers */
            if (isDev) {
                app.get("/echo", (req, res) => res.send(req.query.what || "...echo!"));
            }
            const { authorize, requireRole } = auth.middleware;
            app.post("/login", auth.controllers.login);
            app.get("/refresh", authorize, auth.controllers.refresh)
            app.get("/profile", authorize, auth.controllers.getProfile);
            app.post("/change-password", authorize, requireRole(['admin']), auth.controllers.changePassword);
            // Errors
            app.use(errorHandler);
            return resolve();
        } catch (error) {
            debug(error);
            return reject(error);
        }
    })
}