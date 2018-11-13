import cors from "cors";
import { Express } from "express-serve-static-core";
import helmet from "helmet";
import errorHandler from "./error-handler";
import { debugModule } from "@australis/create-debug";
import { configure as configureAuth } from "@local/auth";

const debug = debugModule(module);
/** */
export type Plugin = (app: Express) => any;
/**
 *
 * @param app
 */
export default function configure(app: Express) {
  /** */
  return new Promise(async (resolve, reject) => {
    try {
      /** Middleware */
      app.use(
        cors({
          origin: process.env.CORS_ORIGIN,
          methods: "*",
          credentials: true
        })
      );
      app.use(helmet());
      // ...
      if (!process.env.APP_FEATURES) {
        return Promise.reject("APP_FEATURES is Required!");
      }
      const features = process.env.APP_FEATURES.split(",");
      if (features.indexOf("admin") !== -1) {
        await configureAuth(app);
        const { configure: products } = await import("@local/products");
        await products(app);
        const { configure: customers } = await import("@local/customers");
        await customers(app);
        const { configure: lilcenses } = await import("@local/licenses");
        await lilcenses(app);
        const { configure: deliver } = await import("@local/deliver");
        await deliver(app);
        /**
         * Configure UI
         */
        const { static: serveStatic } = await import("express");
        const { resolve: resolvePath } = await import("path");
        const pathToUi = resolvePath(__dirname, "..", "..", "tiny-auth-ui", "build");
        app.use("/", serveStatic(pathToUi));
        app.use("*", serveStatic(resolvePath(pathToUi, "index.html")));
        debug("Feature 'admin' configured");
      }
      if (features.indexOf("validate") !== -1) {
        const validate = await import("@local/validate");
        await validate.configure(app);
        debug("Feature 'validate' configured");
      }

      // Errors
      app.use(errorHandler);
      debug("configured");
      return resolve();
    } catch (error) {
      debug(error);
      return reject(error);
    }
  });
}
