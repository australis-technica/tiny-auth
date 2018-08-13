import { debugModule } from "@australis/create-debug";
import { Express } from "express-serve-static-core";
import { validateHandler as validateLicense } from "./lic";
import validator from "./lic/validator";
const debug = debugModule(module);
/** */
export default function (app: Express) {
  
  /** api/v1 */
  app.get(
    "/api/v1/validate",
    validateLicense(validator),
  );  
  debug("configured");
}