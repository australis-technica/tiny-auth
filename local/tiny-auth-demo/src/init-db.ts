import createdb from "@australis/tiny-sql-create-db";
import { init as initUsers } from "@australis/tiny-auth-users-sql";
import connect from "@australis/tiny-sql-connect";
import { Connection } from "tedious";
import Debug from "./debug";
import * as settings from "./settings";
import sqlConnectionConfig from "./sql-connection-config";
import { init as initTokenBlacklist } from "./token-blacklist";
import { table as customers } from "./customers";
import { table as products } from "./products";
import { table as licenses } from "./licenses";
const debug = Debug(__filename);
/**
 * 
 */
export default async () => {
  let connection: Connection;
  try {
    // create db if not exists, before connecting to it
    await createdb(sqlConnectionConfig.options.database);
    connection = await connect(sqlConnectionConfig);
    await initUsers(connection);
    await initTokenBlacklist(connection);
    await settings.init(connection);
    await settings.defaults(connection, );
    await customers.init(connection);
    await products.init(connection);
    await licenses.init(connection);
    return Promise.resolve();
  } catch (error) {
    debug(error);
    return Promise.reject(error);
  } finally {
    connection && connection.close();
  }
};
