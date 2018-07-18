import "@australis/load-env";
import { execSql } from "@australis/tiny-sql";
import connectToServer from "@australis/sql-connect-to-server";
import { join } from "path";
import { Connection } from "tedious";
import createTokenBlacklist from "../src";
import jsonwebtoken from "jsonwebtoken";
import connect from "@australis/sql-connection-factory";

jest.setTimeout(10000);

describe(require(join(__dirname, "../package.json")).name, () => {
  // ...
  it("inits", async () => {
    const TABLE_NAME = "token_blacklist";
    const tokenBlacklist = createTokenBlacklist(TABLE_NAME, (token) => jsonwebtoken.decode(token) as any);
    let connection: Connection;
    try {
      connection = await connectToServer();
      await execSql(connection)(`
        if(exists(select top 1 name from sys.databases where name = 'testdb')) drop database testdb;
        create database testdb;
      `)
      connection.close();
      connection = await connect();
      await tokenBlacklist.init(connection);
      const result = await execSql(connection)<{ name: string }>(
        `use testdb;
        select top 1 name from sys.tables where name = @name
        `, {
          name: TABLE_NAME
        }
      );
      if (result.error) { throw result.error };
      expect(result.values[0].name).toBe(TABLE_NAME);
    } finally {
      connection && connection.close();
    }
  });
});
