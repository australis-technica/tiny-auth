import { debugModule } from "@australis/create-debug";
import {
  CrudController,
  ensureBody,
  ensureID
} from "@australis/tiny-crud-controller";
import { json } from "body-parser";
import { Express, RequestHandler, Router } from "express";
import uuid from "uuid";
import auth from "@local/auth";
import { repo } from "@australis/tiny-auth-products";
const debug = debugModule(module);
/**
 *
 * @param app
 */
export default async function configureCrud<A extends Express | Router>(app: A): Promise<A> {
  const { authorize, requireRole } = auth.middleware;
  {
    const crud = CrudController(repo);
    const endpoint = "products";
    const route = `/api/${endpoint}/:id?`;
    app.get(route, [authorize, requireRole(["admin"]), crud.get()]);
    app.put(route, [
      authorize,
      requireRole(["admin"]),
      json(),
      ensureBody(),
      ensureID(uuid),
      ((req, _res, next) => {
        // include user
        try {
          req.body.userid = req.user.id;
          return next();
        } catch (error) {
          return next(error);
        }
      }) as RequestHandler,
      crud.put()
    ]);
    app.post(route, [
      authorize,
      requireRole(["admin"]),
      json(),
      ensureBody(),
      ensureID(), // reject missing id
      crud.post()
    ]);
    app.delete(route, [
      authorize,
      json(),
      ensureBody(),
      ensureID(), // reject no id
      requireRole(["admin", "delete"]),
      crud.dlete()
    ]);
    debug("configured");
    return app;
  }
}
