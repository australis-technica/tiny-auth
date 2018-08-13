import { json } from "body-parser";
import { Express, RequestHandler } from "express-serve-static-core";
import uuid from "uuid";
import auth from "../auth";
import {
  CrudController,
  ensureBody,
  ensureID,
  excludeKeys,
  validate,
  rejectKeys
} from "@australis/tiny-crud-controller";

import { signMiddleware } from "../lic";
import licenses from "./repo";
import validatePut from "./validate-put";
import repo from "./repo";
/**
 * Licenses
 * @param app
 */
export default function configureCrud(app: Express) {
  const { authorize, requireRole } = auth.middleware;
  const crud = CrudController(licenses);
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
      // include user
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
}
