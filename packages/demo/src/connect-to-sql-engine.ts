import { connect } from "@australis/tiny-sql";
import { Connection } from "tedious";
import sqlConnectionConfig from "@australis/sql-connection-config";
/**
 * connect to server, not db
 */
export default function connectToSqlEngine(envKey = "DB"): Promise<Connection> {
  const { options, ...engineConfig } = sqlConnectionConfig(envKey);
  return connect({ ...engineConfig, options: { encrypt: false } });
}
