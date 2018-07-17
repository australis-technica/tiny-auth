import Debug from "./debug";
import { execSql } from "@australis/tiny-sql";
import { Connection } from "tedious";
import connectToSqlEngine from "./connect-to-server";
const debug = Debug(__filename);
/**
 * create database if not exists
 */
export default async function createSqlDb(database: string) {
  let connection: Connection;
  try {
    // do connect to database
    connection = await connectToSqlEngine();
    const r = await execSql(connection)(`
      if(not(exists(select name from sys.databases where name = '${
        database
      }')))
      create database ${database};
      `);
    return Promise.resolve(r);
  } catch (error) {
    debug(error);
    return Promise.reject(error);
  } finally {
    connection && connection.close;
  }
}
