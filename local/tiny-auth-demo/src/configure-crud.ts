import { Express } from "express-serve-static-core";
import CrudController from "./crud-controller";
import { repo as customers } from "./customers";
import { repo as products } from "./products";
import { repo as licenses } from "./licenses";
import auth from "./auth";
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
      ...crud.put
    ]);
    app.post(route, [
      authorize,
      requireRole(["admin"]),
      ...crud.post
    ]);
  }
  {
    const crud = CrudController(products, { autogenID: true });
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
      ...crud.put
    ]);
    app.post(route, [
      authorize,
      requireRole(["admin"]),
      ...crud.post
    ]);
  }
  {
    const crud = CrudController(licenses, { autogenID: true });
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
      ...crud.put
    ]);
    app.post(route, [
      authorize,
      requireRole(["admin"]),
      ...crud.post
    ]);
  }
}
