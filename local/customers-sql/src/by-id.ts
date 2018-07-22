import ExecSql from "@australis/tiny-sql-exec-sql";
import { Connection } from "tedious";
import { debugModule } from "@australis/create-debug";
import { Customer } from "./types";
import { TABLE_NAME } from "./constants";
/** */
const debug = debugModule(module);
/**
 *
 */
export default async function byId(
  connection: Connection,
  id: string
): Promise<Customer> {
  try {
    const execSql = ExecSql(connection);
    const result = await execSql<Customer>(
      `
        select top 1 * from ${TABLE_NAME} where id = @id
        `,
      { id }
    );    
    return Promise.resolve(result.values[0]);
  } catch (error) {
    debug(error);
    throw error;
  }
}
