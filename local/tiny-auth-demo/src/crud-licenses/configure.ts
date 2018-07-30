import { Express, RequestHandler } from "express-serve-static-core";
import {
  CrudController,
  ensureID,
  validate,
  ensureBody,
  fromLocals,
  excludeKeys
} from "../crud-controller";

import licenses from "./repo";
import auth from "../auth";
import uuid from "uuid";
import { json } from "body-parser";
import * as lic from "../lic";
import RejectKeys from "../crud-controller/reject-keys";
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
      ((req, res, next) => {
        // re shape body
        try {
          const { features, ...body } = req.body;
          const token = lic.sign(lic.createLicRequest({}), features);
          res.locals.body = Object.assign(body, { token });
          next();
        } catch (error) {
          return next(error);
        }
      }) as RequestHandler,
      // send to crud
      crud.put(fromLocals, excludeKeys("token"))
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
  }
}
