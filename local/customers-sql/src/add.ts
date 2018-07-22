import ExecSql from "@australis/tiny-sql-exec-sql";
import { Connection } from "tedious";
import { debugModule } from "@australis/create-debug";
import { TABLE_NAME } from "./constants";
import { Customer } from "./types";
import byId from "./by-id";
/** */
const debug = debugModule(module);
/**
 *
 */
export default async function add(
  connection: Connection,
  item: Partial<Customer> & { id: string; displayName: string }
): Promise<Customer> {
  try {
    const execSql = ExecSql(connection);    
    const sql = `
      insert into ${TABLE_NAME}         
      (${Object.keys(item)
        // .filter(key => key !== "id")
      .join(",")}) 
      values 
      (${Object.keys(item)
        // .filter(key => key !== "id")
        .map(key => `@${key}`)
        .join(",")}) 
      `;
    debug(sql);
    await execSql<Customer>(sql, item);
    return byId(connection, item.id);
  } catch (error) {
    debug(error);
    throw error;
  }
}
