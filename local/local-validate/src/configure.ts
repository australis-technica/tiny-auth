import { debugModule } from "@australis/create-debug";
import { Express } from "express-serve-static-core";
import validateHandler from "./validate-handler";
import validator from "./validator";
const  isDev = process.env.NODE_ENV !== "production";

const debug = debugModule(module);
/** */
export default function (app: Express) {

  /** api/v1 */
  app.get(
    "/api/v1/validate",
    validateHandler(validator),
  );
  if (isDev) {    
    app.get("/api/v1/echo/:what?", (req, res) => {
      return res.send(req.params.what || req.query.what || "echo ...");
    });
  }
  debug("configured");
}