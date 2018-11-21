import execSql from "@australis/tiny-sql-exec-sql";
import connectToServer from "@australis/tiny-sql-connect-to-server";
import { join } from "path";
import { Connection } from "tedious";
import createTokenBlacklist from "../src/create";
import jsonwebtoken from "jsonwebtoken";
import connect from "@australis/tiny-sql-connection-factory";

beforeAll(async () => {
  let connection: Connection;
  try {
    connection = await connectToServer();
    await execSql(connection)(`
    if(exists(select top 1 name from sys.databases where name = 'testdb')) drop database testdb;
    create database testdb;
  `);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    connection && connection.close();
  }

})

const TABLE_NAME = "token_blacklist";
const tokenBlacklist = createTokenBlacklist(TABLE_NAME, (token) => {
  const r = jsonwebtoken.decode(token) as any;
  return r;
});
/**
 * 
 */
describe(require(join(__dirname, "../package.json")).name, () => {
  /**
   * 
   * */
  it("works", async () => {
    let connection: Connection;
    try {
      connection = await connect();
      // Init 
      await tokenBlacklist.init(connection);
      const result = await execSql(connection)<{ name: string }>(
        `select top 1 name from sys.tables where name = @name`, {
          name: TABLE_NAME
        }
      );
      if (result.error) { throw result.error };
      expect(result.values[0].name).toBe(TABLE_NAME);
      // Add            
      {
        const token = await jsonwebtoken.sign({ token_id: "999" }, "");
        await tokenBlacklist.add(connection, token);
        expect(await execSql(connection)<{ token: string }>(
          `select top 1 token from ${TABLE_NAME} where id = @token_id`, {
            token_id: "999"
          }
        ).then(x => x.values[0].token)).toBe(token);
      }
      // Add without id
      {
        const token = await jsonwebtoken.sign({ token_id: "999" }, "");
        await tokenBlacklist.add(connection, token);
        expect(await execSql(connection)<{ token: string }>(
          `select top 1 token from ${TABLE_NAME} where token = @token`, {
            token
          }
        ).then(x => x.values[0].token)).toBe(token);
      }
      // clear
      await tokenBlacklist.clear(connection);
      expect(await execSql(connection)<{ token: string }>(
        `select top 1 token from ${TABLE_NAME}`
      ).then(x => x.values[0])).toBe(undefined);
      // isBlackListed      
      {
        const token = await jsonwebtoken.sign({ token_id: "999" }, "");
        await tokenBlacklist.add(connection, token);
        expect(await tokenBlacklist.isBlackListed(connection, token)).toBe(true);
      }
      {
        const token = await jsonwebtoken.sign({ token_id: "999" }, "");
        expect(await tokenBlacklist.isBlackListed(connection, token)).toBe(false);
      }
    }
    finally {
      connection && connection.close();
    }
  })
});
