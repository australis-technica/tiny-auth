import cors from "cors";
import { Express } from "express-serve-static-core";
import helmet from "helmet";

import Debug from "./debug";
import errorHandler from "./error-handler";
const debug = Debug(__filename);
/** */
export type Plugin = (app: Express) => any;
/**
 * 
 * @param app 
 */
export default function configure(app: Express, plugins: Plugin[]) {
    /** */
    return new Promise(async (resolve, reject) => {
        try {
            /** Middleware */
            app.use(cors({
                origin: process.env.CORS_ORIGIN || "*",
                methods: "*"
            }));
            app.use(helmet());
            for (const plugin of plugins) {
                if (!plugin) continue;
                plugin(app);
            }
            // Errors
            app.use(errorHandler);
            debug("configured");
            return resolve();
        } catch (error) {
            debug(error);
            return reject(error);
        }
    })
}