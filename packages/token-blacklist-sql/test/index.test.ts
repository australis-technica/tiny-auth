import { connect, execSql as ExecSql } from "@australis/tiny-sql";
import { Connection, ConnectionConfig } from "tedious";
import { join } from "path";
/**
 * expects: '{
    "server": string,
    "port": number, //1433,
    "userName": string,
    "password": string,
    "options": {
        "database": string,
        "encrypt": boolean
    }
  }'
 */
const connectionConfig = require(join(
  __dirname,
  "../.secrets/connection-config"
));

function withoutDB(connectionConfig: ConnectionConfig) {
  const { options, ...config } = connectionConfig;
  const { database, ...rest } = options;
  return {
    ...config,
    options: rest
  };
}

export default async function initTestDb() {
  let connection: Connection;
  try {
    connection = await connect(withoutDB(connectionConfig));
    const execSql = ExecSql(connection);
    const { database } = connectionConfig.options;
    await execSql(
      `if(exists(select 1 from sys.databases  where name = '${database}')) drop database ${database}`
    );
    await execSql(`create DATABASE ${database}`);
  } finally {
    connection && connection.close();
  }
}

function newConnection() {
  return connect(connectionConfig);
}

describe("init", () => {

  it("Works", async () => {

    const TABLE_NAME = "?";

    await initTestDb();
    let connection: Connection;
    try {
      connection = await newConnection();
      
      // const ok = await initTable(connection);
      // expect(ok).toBeTruthy();

      /** Expect table to exists */
      const table = await ExecSql(connection)<{ name: string }>(
        `select top 1 name from sys.tables where name = '${TABLE_NAME}'`
      ).then(x => x.values[0]);
      expect(table.name).toBe("users");      
    } finally {
      connection && connection.close();
    }
  });
});
