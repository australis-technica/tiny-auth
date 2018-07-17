import { connect } from "@australis/tiny-sql";
import { init as initUsers } from "@australis/tiny-auth-users-sql";
import { Connection } from "tedious";
import createDb from "./create-db";
import config from "./connection-config";
import Debug from "./debug";
import settings from "./settings";
const debug = Debug(__filename);
/**
 * 
 */
export default async () => {  
  let connection: Connection;
  try {
    // create db if not exists, before connecting to it
    await createDb(config.options.database);
    connection = await connect(config);    
    await initUsers(connection);
    await settings.db.init(connection);
    await settings.db.defaults(connection);
    return Promise.resolve();
  } catch (error) {
    debug(error);
    return Promise.reject(error);
  } finally {
    connection && connection.close();
  }
};
