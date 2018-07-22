import { debugModule } from "@australis/create-debug";
import ExecSql from "@australis/tiny-sql-exec-sql";
import { Connection } from "tedious";
import { TABLE_NAME } from "./constants";
import { readFileSync } from "fs";
import { join } from "path";

const debug = debugModule(module);
/** */
let sql: string;
try {
  sql = readFileSync(
    join(__dirname, "../sql/init.sql")
      .replace(/@TABLE_NAME/, TABLE_NAME),
    "utf-8"
  );
} catch (er) {
  debug(er);
  throw er;
}
/** */
export default async function init(connection: Connection) {
  try {
    const execSql = ExecSql(connection);
    await execSql(sql);
    return execSql<{ ok: number }>(
      `select ok=1 from sys.tables where name = '${TABLE_NAME}'`
    ).then(x => x.values[0]["ok"] === 1);
  } catch (error) {
    debug(error);
    throw error;
  }
}
