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
    const { init: users } = await import("@australis/tiny-auth-users");
    const { default: customers } = await import("@australis/tiny-auth-customers");
    const { default: licenses } = await import("@australis/tiny-auth-licenses");
    const { default: products } = await import("@australis/tiny-auth-products");
    const { init: settings } = await import("@local/settings");
    const { init: tokenBlackList } = await import("@local/token-blacklist");
    await tokenBlackList(connection);
    await users(connection);
    await settings(connection);
    await settings(connection);
    await customers.init();
    await products.init();
    await licenses.init();
    debug("Completed: %s", process.env.DB);
    return Promise.resolve();
  } catch (error) {
    debug(error);
    return Promise.reject(error);
  } finally {
    connection && connection.close();
  }
};
