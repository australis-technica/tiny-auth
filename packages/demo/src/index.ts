import "@australis/load-env";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import Debug from "./debug";
import errorHandler from "./error-handler";
import auth from "./auth";
import initDB from "./init-db";
//...
const debug = Debug(__filename);
const app = express();
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

/** START */
const start = (port: number) => new Promise((resolve, reject) => {
    if (!port) {
        return reject("NO PORT specified");
    }
    app.listen(port, ((error: any) => {
        if (error) {
            return reject(error);
        }
        return resolve();
    }))
})
// Errors
app.use(errorHandler);
/** */
initDB()
    .then(() => start(Number(process.env.PORT)))
    .then(() => {
        debug(`listening on PORT=${process.env.PORT}`);
        debug(`pid=${process.pid}`);
    })
    .catch((error) => {
        debug(error);
        process.exit(-1);
    })