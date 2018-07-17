import helmet from "helmet";
import cors from "cors";
import Debug from "./debug";
import errorHandler from "./error-handler";
import auth from "./auth";
import { Express } from "express-serve-static-core";
const debug = Debug(__filename);
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
            app.get("/echo", (req, res) => res.send(req.query.what || "...echo!"));
            app.post("/login", auth.controllers.login);
            app.get("/refresh", auth.middleware.authorize, auth.controllers.refresh)
            app.get("/profile", auth.middleware.authorize, auth.controllers.getProfile);
            app.post("/change-password", auth.middleware.authorize, auth.middleware.requireRole(['admin']), auth.controllers.changePassword);
            // Errors
            app.use(errorHandler);
            return resolve();
        } catch (error) {
            debug(error);
            return reject(error);
        }
    })
}