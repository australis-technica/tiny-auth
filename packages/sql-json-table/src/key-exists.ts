import { execSql as ExecSql } from "@australis/tiny-sql";
import { Connection } from "tedious";
import { Indexer } from "./types";
import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);
/** */
export default (tableName: string) => {
  /** */
  return async (connection: Connection, key: string) => {
    try {
      const execSql = ExecSql(connection);      
      return execSql<Indexer>(
        `select top 1 [key] from ${tableName} where [key] = '${key}';`
      ).then(x=> x.values[0]).then(x=> x && !!x["key"]);
      return Promise.resolve();
    } catch (error) {
      debug(error);
      return Promise.reject(error);
    }
  };
};
