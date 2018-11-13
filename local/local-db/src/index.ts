import { debugModule } from "@australis/create-debug";
import { init as initUsers } from "@australis/tiny-auth-users-sql";
import connect from "@australis/tiny-sql-connection-factory";
import { Connection } from "tedious";
import { table as customers } from "@australis/tiny-auth-customers";
import { table as licenses } from "@australis/tiny-auth-licenses";
import { table as products } from "@australis/tiny-auth-products";
import { init as settings } from "@local/settings";
import { init as initTokenBlacklist } from "@local/token-blacklist";
const debug = debugModule(module);
/**
 * 
 */
export const init = async () => {
  let connection: Connection;
  try {
    // create db if not exists, before connecting to it
    connection = await connect();
    await initUsers(connection);
    await initTokenBlacklist(connection);
    await settings(connection);
    await settings(connection);
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
