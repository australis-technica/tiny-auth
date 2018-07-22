import ExecSql from "@australis/tiny-sql-exec-sql";
import { Connection } from "tedious";
import { debugModule } from "@australis/create-debug";
import { Customer } from "./types";
import { TABLE_NAME } from "./constants";
/** */
const debug = debugModule(module);
/**
 * TODO:
 */
export default async function findBy(
  connection: Connection,
  params: Partial<Customer>
): Promise<Customer[]> {
  try {
    const execSql = ExecSql(connection);
    const r = await execSql<Customer>(
        `select * from ${TABLE_NAME} 
         where ${Object.keys(params).map(key=> ` ${key} = @${key}`).join(" AND ")}`,
        params
    );
    if (r.error) {
      return Promise.reject(r.error);
    }
    return Promise.resolve(r.values);
  } catch (error) {
    debug(error);
    throw error;
  }
}
