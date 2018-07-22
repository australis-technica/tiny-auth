import ExecSql from "@australis/tiny-sql-exec-sql";
import { Connection } from "tedious";
import { debugModule } from "@australis/create-debug";
import { Customer } from "./types";
import { TABLE_NAME } from "./constants";
import byId from "./by-id";
import getFields from "./get-fields";
/** */
const debug = debugModule(module);
/**
 *
 */
export default async function update(
  connection: Connection,
  item: Partial<Customer> & { id: string }
): Promise<Customer> {
  if (!item)
    return Promise.reject(
      new Error(`@param ${TABLE_NAME}: ${TABLE_NAME} required`)
    );
  try {
    const execSql = ExecSql(connection);
    /** */
    const current = await execSql<Customer>(
      `select top 1 * from ${TABLE_NAME} where id = @id`,
      { id: item.id }
    ).then(x => x.values[0]);
    if (!current || !current.id) {
      return Promise.reject(new Error(`${TABLE_NAME} Not Found`));
    }
    const fields = getFields(item);
    if (!fields || !fields.length) {
      return Promise.reject(`Nothing to update`);
    }
    /** */
    const r = await execSql<Customer>(
      `
            update ${TABLE_NAME} 
            set 
                ${fields}
            , updatedAt = GETDATE()
            where id = @id
        `,
      Object.assign(current, item)
    );
    if (r.error) {
      return Promise.reject(r.error);
    }
    // if(r.affected === ) { return Promise.reject(r.error); }
    // if(r.status === ) { return Promise.reject(r.error); }
    return byId(connection, item.id);
  } catch (error) {
    debug(error);
    throw error;
  }
}
