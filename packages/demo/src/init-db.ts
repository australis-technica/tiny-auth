import { connect } from "@australis/tiny-sql";
import { init as initUsers } from "@australis/tiny-auth-users-sql";
import { Connection } from "tedious";
import { sqlConnectionConfig, createSqlDb} from "./db";
import * as settings from "./settings"
import Debug from "./debug";
const debug = Debug(__filename);
/**
 * 
 */
export default async () => {  
  let connection: Connection;
  try {
    // create db if not exists, before connecting to it
    await createSqlDb(sqlConnectionConfig.options.database);
    connection = await connect(sqlConnectionConfig);    
    await initUsers(connection);
    await settings.init(connection);
    await settings.defaults(connection,);
    return Promise.resolve();
  } catch (error) {
    debug(error);
    return Promise.reject(error);
  } finally {
    connection && connection.close();
  }
};
