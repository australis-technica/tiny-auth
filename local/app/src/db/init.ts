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
    const {
      default: tokenBlackList,
    } = await import("@australis/tiny-auth-token-blacklist");
    await tokenBlackList.init(connection);
    await users(connection);
    debug("Completed: %s", process.env.DB);
    return Promise.resolve();
  } catch (error) {
    debug(error);
    return Promise.reject(error);
  } finally {
    connection && connection.close();
  }
};
