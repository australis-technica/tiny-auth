import { debugModule } from "@australis/create-debug";
import { json } from "body-parser";
import { Express } from "express-serve-static-core";
import auth from "./auth";
import { repo as licenses } from "./crud-licenses";
import { deliver } from "./lic";
const debug = debugModule(module);
/** */
export default function (app: Express) {
  const { authorize, requireRole } = auth.middleware;  
  app.post(
    "/api/v1/deliver",
    authorize,
    requireRole(['user']),
    json(),
    deliver(licenses.byId)
  );
  debug("configured");
}