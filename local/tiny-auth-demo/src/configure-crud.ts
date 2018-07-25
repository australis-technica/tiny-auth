import { Express, RequestHandler } from "express-serve-static-core";
import {
  CrudController,
  ensureID,
  validate,
  ensureBody,
  fromLocals,
  excludeKeys
} from "./crud-controller";
import { repo as customers } from "./customers";
import { repo as products } from "./products";
import { repo as licenses } from "./licenses";
import auth from "./auth";
import uuid from "uuid";
import { json } from "body-parser";
import * as lic from "./lic";
/**
 *
 * @param app
 */
export default function configureCrud(app: Express) {
  const { authorize, requireRole } = auth.middleware;
  {
    // Licenses
    const crud = CrudController(customers);
    const endpoint = "customers";
    const route = `/api/${endpoint}/:id?`;
    app.get(route, [authorize, requireRole(["admin"]), crud.get()]);
    app.put(route, [
      authorize,
      requireRole(["admin"]),
      json(),
      ensureBody(),
      // ensureID(), // reject missing id
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
  }
  {
    const crud = CrudController(products);
    const endpoint = "products";
    const route = `/api/${endpoint}/:id?`;
    app.get(route, [authorize, requireRole(["admin"]), crud.get()]);
    app.put(route, [
      authorize,
      requireRole(["admin"]),
      json(),
      ensureBody(),
      ensureID(uuid),
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
  }
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
      validate(async req => {
        try {
          const validation: string[] = [];
          if (!req || !req.body) {
            return ["Invalid Request"];
          }
          if (!req.body.product) {
            validation.push("product required");
          } else {
            const product = await products.byId(req.body.product);
            if (!product || !product.id) {
              validation.push("existing product required");
            }
          }
          // ...
          if (!req.body.customer) {
            validation.push("customer required");
          } else {
            const customer = await customers.byId(req.body.customer);
            if (!customer || !customer.id) {
              validation.push("existing customer required");
            }
          }
          // ... Validate existing , decoding payload
          {
            // ... Validate existing , decoding payload
            // Make it slow .....
          }
          return validation;
        } catch (error) {
          return [error.message];
        }
      }),
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
      // Do not modify
      ((_req, _res, next) => {
        if (_req.body.token) {
          return next(new Error("Not Implemented, readonly"));
        }
        if (_req.body.customer) {
          return next(new Error("Not Implemented, readonly"));
        }
        if (_req.body.product) {
          return next(new Error("Not Implemented, readonly"));
        }
        if (_req.body.features) {
          return next(new Error("Not Implemented, readonly"));
        }
        if (_req.body.createdAt) {
          return next(new Error("Not Implemented, readonly"));
        }
      }) as RequestHandler,
      crud.post()
    ]);
  }
}
