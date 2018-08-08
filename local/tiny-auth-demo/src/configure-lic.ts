import { json } from "body-parser";
import { Express } from "express-serve-static-core";
import auth from "./auth";
import { repo as licenses } from "./crud-licenses";
import { deliver, validateHandler as validateLicense } from "./lic";
// TODO:
import validator from "./lic/validator";
/** */
export default function (app: Express) {
  const { authorize, requireRole } = auth.middleware;
  /** api/v1 */
  app.get(
    "/api/v1/validate",
    validateLicense(validator),
  );
  app.post(
    "/api/v1/deliver",
    authorize,
    requireRole(['user']),
    json(),
    deliver(licenses.byId)
  );
}