import cors from "cors";
import { Express } from "express-serve-static-core";
import helmet from "helmet";
import errorHandler from "./error-handler";
import { debugModule } from "@australis/create-debug";
import configureAuth from "./configure-auth";

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
      if (features.indexOf("admin")!== -1) {
        await configureAuth(app);
        const products = await import("./products");
        await products.configure(app);
        const customers = await import("./customers");
        await customers.configure(app);
        const lilcenses = await import("./licenses");
        await lilcenses.configure(app);
        const deliver = await import("./deliver");
        await deliver.configure(app);
        debug("Feature 'admin' configured");
      }
      if (features.indexOf("validate") !== -1) {
        const validate = await import("./validate");
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
