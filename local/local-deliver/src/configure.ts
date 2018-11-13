import { debugModule } from "@australis/create-debug";
import { json } from "body-parser";
import { Express, Router } from "express";
import auth from "@local/auth";
import deliver from "./deliver";
import { findById } from "@local/validate";
const debug = debugModule(module);
/** */
export default async function <A extends Express | Router>(app: A): Promise<A> {
  const { authorize, requireRole } = auth.middleware;
  app.post(
    "/api/deliver",
    authorize,
    requireRole(["user"]),
    json(),
    deliver(findById)
  );
  debug("configured");
  return app;
}
