import { Connection } from "tedious";
import table from "./table";
/**
 *
 * @param x
 */
function isConnection(x: any): x is Connection {
  return x instanceof Connection;
}
/** */
export default async function repo(
  connect: () => Connection | Promise<Connection>
) {
  /** */
  async function withConnection(callback: (connection: Connection) => any) {
    let con: Connection;
    try {
      con = isConnection(connect) ? connect : await connect();
      return callback(con);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      con && con.close();
    }
  }
  /** */
  return {
    add: (key: string, value: any) =>
      withConnection(con => table.add(con, key, value)),
    getValue: (key: string) => withConnection(con => table.getValue(con, key)),
    setValue: (key: string, value: any) =>
      withConnection(con => table.setValue(con, key, value)),
    keyExists: (key: string) =>
      withConnection(con => table.keyExists(con, key)),
    removeKey: (key: string) => withConnection(con => table.removeKey(con, key))
  };
}
