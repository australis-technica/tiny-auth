import { Express } from "express-serve-static-core";
import { configure as configureProducts } from "./crud-products";
import { configure as configureCustomers } from "./crud-customers";
import { configure as configureLicenses } from "./crud-licenses";
/**
 *
 * @param app
 */
export default function configureCrud(app: Express) {
  configureCustomers(app);
  configureProducts(app);
  configureLicenses(app);
}
