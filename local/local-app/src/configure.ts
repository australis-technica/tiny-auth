import cors from "cors";
import { Express } from "express";
import helmet from "helmet";
import { debugModule } from "@australis/create-debug";
import { configure as configureAuth } from "@local/auth";

const debug = debugModule(module);
/** */
export type Plugin = (app: Express) => any;
/**
 *
 * @param app
 */
export default () => (app: Express) => {
    /** */
    return new Promise(async (resolve, reject) => {
        try {
            // ...           
            const { default: getFeatures } = await import("@local/features");
            const features = await getFeatures();
            if (!features.length) {
                return Promise.reject("APP_FEATURES is Required!")
            }

            /** Middleware */
            app.use(
                cors({
                    origin: process.env.CORS_ORIGIN || "*",
                    methods: "*",
                    credentials: true
                })
            );

            app.use(helmet());

            await configureAuth(app);

            if (features.indexOf("admin") !== -1) {
                const { default: admin } = await import("./use-admin");
                await admin()(app);
            }

            if (features.indexOf("ui") !== -1) {
                const { default: useUi } = await import("./use-ui");
                const { resolve } = await import("path");
                await useUi({
                    uiPath: resolve(__dirname, "../../local-app-ui/build"),
                    /* defaultDocument: "index.html" */
                })(app);
                debug("Feature 'admin' configured");
            }

            if (features.indexOf("validate") !== -1) {
                const validate = await import("@local/validate");
                await validate.configure(app);
                debug("Feature 'validate' configured");
            }

            // Errors
            const { default: errorHandler } = await import("@australis/express-plain-text-error-handler")
            app.use(errorHandler());
            debug("configured");
            return resolve();
        } catch (error) {
            debug(error);
            return reject(error);
        }
    });
}
