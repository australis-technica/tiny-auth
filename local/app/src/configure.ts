import cors from "cors";
import { Express, RequestHandler } from "express";
import helmet from "helmet";
import { debugModule } from "@australis/create-debug";
import { authorize, requireRole } from "./auth";

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
      /** Middleware */
      app.use(
        cors({
          origin: process.env.CORS_ORIGIN || "*",
          methods: "*",
          credentials: true,
        }),
      );
      app.use(helmet());
      {
        const { default: configure } = await import("./auth");
        app.use("/api/auth", configure())
      }
      app.get("/api/admin", [authorize, requireRole(["admin"]), ((req, res, next) => {
        try {
          if (!req) {

          }
          res.send("ok");
        } catch (error) {
          next(error);
        }
      }) as RequestHandler]);
      app.get("/api/bob", [authorize, requireRole(["bob"]), ((req, res, next) => {
        try {
          if (!req) {

          }
          res.send("ok");
        } catch (error) {
          next(error);
        }
      }) as RequestHandler]);
      app.get("/api/ok", [authorize, ((req, res, next) => {
        try {
          if (!req) {

          }
          res.send("ok");
        } catch (error) {
          next(error);
        }
      }) as RequestHandler])
      {
        const { default: useUi } = await import("./use-ui");
        const { resolve } = await import("path");
        await useUi({
          uiPath: resolve(__dirname, "../../app-ui/build"),
          /* defaultDocument: "index.html" */
        })(app);
      }
      // Errors
      const {
        default: errorHandler,
      } = await import("@australis/express-plain-text-error-handler");
      app.use((error: any, _req: any, _res: any, next: any) => {
        next(error);
      });
      app.use(errorHandler());
      debug("configured");
      return resolve();
    } catch (error) {
      debug(error);
      return reject(error);
    }
  });
};
