import { Express } from "express-serve-static-core";
import CrudController from "./crud-controller";
import { repo as customers } from "./customers";
import { repo as products } from "./products";
import { repo as licenses } from "./licenses";
/**
 *
 * @param app
 */
export default function configureCrud(app: Express) {
  {
    const crud = CrudController(customers);
    app.get("api/customers/:id?", crud.get);
  }
  {
    const crud = CrudController(products);
    app.get("api/products/:id?", crud.get);
  }
  {
    const crud = CrudController(licenses);
    app.get("api/licences/:id?", crud.get);
  }
}
