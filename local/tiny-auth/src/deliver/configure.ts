import { debugModule } from "@australis/create-debug";
import { json } from "body-parser";
import { Express } from "express-serve-static-core";
import auth from "../auth";
import  deliver  from "./deliver";
import { findById } from "../lic";
const debug = debugModule(module);
/** */
export default function(app: Express) {
  const { authorize, requireRole } = auth.middleware;
  app.post(
    "/api/deliver",
    authorize,
    requireRole(["user"]),
    json(),
    deliver(findById)
  );
  debug("configured");
}
