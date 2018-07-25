import { Express } from "express-serve-static-core";
import { CrudController, ensureID, validate, ensureBody } from "./crud-controller";
import { repo as customers } from "./customers";
import { repo as products } from "./products";
import { repo as licenses } from "./licenses";
import auth from "./auth";
import uuid from "uuid";
import { json } from "body-parser";
/**
 *
 * @param app
 */
export default function configureCrud(app: Express) {
  const { authorize, requireRole } = auth.middleware;
  {
    const crud = CrudController(customers);
    const endpoint = "customers";
    const route = `/api/${endpoint}/:id?`;
    app.get(route, [
      authorize,
      requireRole(["admin"]),
      crud.get
    ]);
    app.put(route, [
      authorize,
      requireRole(["admin"]),
      json(),
      ensureBody(),
      // ensureID(), // reject missing id
      crud.put
    ]);
    app.post(route, [
      authorize,
      requireRole(["admin"]),
      json(),
      ensureBody(),
      ensureID(), // reject missing id
      crud.post
    ]);
  }
  {
    const crud = CrudController(products);
    const endpoint = "products";
    const route = `/api/${endpoint}/:id?`;
    app.get(route, [
      authorize,
      requireRole(["admin"]),      
      crud.get
    ]);
    app.put(route, [
      authorize,
      requireRole(["admin"]),
      json(),
      ensureBody(),
      ensureID(uuid),
      crud.put
    ]);
    app.post(route, [
      authorize,
      requireRole(["admin"]),
      json(),
      ensureBody(),
      ensureID(), // reject missing id
      crud.post
    ]);
  }
  {
    const crud = CrudController(licenses);
    const endpoint = "licenses";
    const route = `/api/${endpoint}/:id?`;
    app.get(route, [
      authorize,
      requireRole(["admin"]),
      crud.get
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
            validation.push("product required")
          } else {
            const product = await products.byId(req.body.product);
            if (!product || !product.id) {
              validation.push("existing product required")
            }
          }
          // ...
          if (!req.body.customer) {
            validation.push("customer required")
          } else {
            const customer = await customers.byId(req.body.customer);
            if (!customer || !customer.id) {
              validation.push("existing customer required")
            }
          }
          return validation;
        } catch (error) {
          return [
            error.message
          ];
        }
      }),
      crud.put
    ]);
    app.post(route, [
      authorize,
      json(),
      ensureBody(),
      ensureID(), // reject no id
      requireRole(["admin"]),
      crud.post
    ]);
  }
}
