import { debugModule } from "@australis/create-debug";
import repo from "@australis/tiny-repos-license";
import { CrudController, ensureBody, ensureID, excludeKeys, rejectKeys, validate } from "@australis/tiny-crud-controller";
import auth from "@local/auth";
import { signMiddleware } from "@local/validate";
import { json } from "body-parser";
import { Express, RequestHandler, Router } from "express";
import uuid from "uuid";
import validatePut from "./validate-put";
const debug = debugModule(module);
/**
 * Licenses
 * @param app
 */
export default async function configureCrud<A extends Express | Router>(app: A): Promise<A> {
  const { authorize, requireRole } = auth.middleware;
  const crud = CrudController(repo);
  const endpoint = "licenses";
  const route = `/api/${endpoint}/:id?`;
  app.get(route + "/download/:id?", [
    authorize,
    requireRole(["admin", "download"]),
    (async (req, res, next) => {
      try {
        if (!req.params.id) {
          return res.status(400).send("lic/id required");
        }
        const found = await repo.byId(req.params.id);
        if (!found) {
          return res.status(404).send("lic/id not found");
        }
        return res
          .attachment("license.lic")
          .send(JSON.stringify(found, null, 2));
      } catch (error) {
        return next(error);
      }
    }) as RequestHandler
  ]);
  app.get(route, [
    authorize,
    requireRole(["admin"]),
    crud.get(excludeKeys("token"))
  ]);
  /** ADD/PUT/INSERT */
  app.put(route, [
    authorize,
    requireRole(["admin"]),
    json(),
    ensureBody(),
    ensureID(uuid),
    validate(validatePut),
    signMiddleware(/* {}: Options */),
    ((req, _res, next) => {
      // include user: why ? 
      try {
        req.body.userid = req.user.id;
        return next();
      } catch (error) {
        return next(error);
      }
    }) as RequestHandler,
    // send to crud
    crud.put(null, excludeKeys("token"))
  ]);
  /**
   * Modify Update
   */
  app.post(route, [
    authorize,
    json(),
    ensureBody(),
    ensureID(), // reject no id
    requireRole(["admin"]),
    rejectKeys([
      "token",
      "customer",
      "product",
      "features",
      "createdAt",
      "updatedAt"
    ]),
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
