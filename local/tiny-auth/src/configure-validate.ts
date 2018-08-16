import { debugModule } from "@australis/create-debug";
import { Express } from "express-serve-static-core";
import { validateHandler as validateLicense } from "./lic";
import validator from "./lic/validator";
import { isDev } from "./env";
const debug = debugModule(module);
/** */
export default function (app: Express) {

  /** api/v1 */
  app.get(
    "/api/v1/validate",
    validateLicense(validator),
  );
  if (isDev) {    
    app.get("/api/v1/echo/:what?", (req, res) => {
      return res.send(req.params.what || req.query.what || "echo ...");
    });
  }
  debug("configured");
}