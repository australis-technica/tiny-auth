import { debugModule } from "@australis/create-debug";
import connect from "@australis/tiny-sql-connection-factory";
import { Connection } from "tedious";
const debug = debugModule(module);
/**
 * 
 */
export default async () => {
  let connection: Connection;
  try {
    // create db if not exists, before connecting to it
    connection = await connect();
    const { init: users } = await import("@australis/tiny-auth-users-sql");
    const { table: customers } = await import("@australis/tiny-auth-customers");
    const { table: licenses } = await import("@australis/tiny-auth-licenses");
    const { table: products } = await import("@australis/tiny-auth-products");
    const { init: settings } = await import("@local/settings");
    const { init: tokenBlackList } = await import("@local/token-blacklist");
    await tokenBlackList(connection);
    await users(connection);
    await settings(connection);
    await settings(connection);
    await customers.init(connection);
    await products.init(connection);
    await licenses.init(connection);
    debug("Completed");
    return Promise.resolve();
  } catch (error) {
    debug(error);
    return Promise.reject(error);
  } finally {
    connection && connection.close();
  }
};
