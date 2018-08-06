import { json } from "body-parser";
import { Express, RequestHandler } from "express-serve-static-core";
import uuid from "uuid";
import auth from "../auth";
import { CrudController, ensureBody, ensureID, excludeKeys, validate } from "../crud-controller";
import RejectKeys from "../crud-controller/reject-keys";
import { signMiddleware } from "../lic";
import licenses from "./repo";
import validatePut from "./validate-put";
/**
 *
 * @param app
 */
export default function configureCrud(app: Express) {
  const { authorize, requireRole } = auth.middleware;
  {
    // Licenses
    const crud = CrudController(licenses);
    const endpoint = "licenses";
    const route = `/api/${endpoint}/:id?`;
    app.get(route, [
      authorize,
      requireRole(["admin"]),
      crud.get(excludeKeys("token"))
    ]);
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
          req.body.userid = req.user.id
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
      RejectKeys([
        "token",
        "customer",
        "product",
        "features",
        "createdAt",
        "updatedAt"
      ]),
      crud.post()
    ]);
    app.delete(route, (_req, res) => {
      res.status(400).send("Not Allowed");
    })
  }
}
