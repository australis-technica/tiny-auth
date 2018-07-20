import "@australis/load-env";
import  execSql from "@australis/tiny-sql-exec-sql";
import connectToServer from "@australis/sql-connect-to-server";
import { join } from "path";
import { Connection } from "tedious";
import createTokenBlacklist from "../src";
import jsonwebtoken from "jsonwebtoken";
import connect from "@australis/tiny-sql-connection-factory";
jest.setTimeout(10000);
const TABLE_NAME = "token_blacklist";
const tokenBlacklist = createTokenBlacklist(TABLE_NAME, (token) => {
  const r = jsonwebtoken.decode(token) as any;
  return r;
});
/**
 * 
 */
describe(require(join(__dirname, "../package.json")).name, () => {
  // ...
  it("inits", async () => {
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

  it("works", async () => {
    const blcaklisted_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl9pZCI6IkFCQ0RFRkciLCJpYXQiOjE1MTYyMzkwMjIsIm1hY2hpbmVfaWQiOiJBQkNERUVGMDEyMzQ1Njc5IiwiY2xpZW50X2lkIjoiQ0xJRU5UMDAtWFlaL1dIQVRFVkVSIiwiY2xpZW50X25hbWUiOiJYeXogQ29ycC4iLCJtYXhfbG9naW5zIjoxMCwiZXhwIjo2MDAwMCwiaXNzIjoibGljZW5zaW5nLmJyaWxsaWFudGxpbmsuYXBwIiwiYXVkIjoiaW50ZXJuYWwubmFtZS5vci5uYW1lc3BhY2UubmFtZS5vci5mdWxseS5xdWFsaWZpZWQuY2xpZW50LmFwcC5uYW1lPyJ9.r-MVf4v1Vtxc6ZSBzPg9FX5QqCglKD4S9erxRkVk_5g`;
    const other_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl9pZCI6IkFCQ0RFRkdYIiwiaWF0IjoxNTE2MjM5MDIzLCJtYWNoaW5lX2lkIjoiQUJDREVFRjAxMjM0NTY3OSIsImNsaWVudF9pZCI6IkNMSUVOVDAwLVhZWi9XSEFURVZFUiIsImNsaWVudF9uYW1lIjoiWHl6IENvcnAuIiwibWF4X2xvZ2lucyI6MTAsImV4cCI6NjAwMDAsImlzcyI6ImxpY2Vuc2luZy5icmlsbGlhbnRsaW5rLmFwcCIsImF1ZCI6ImludGVybmFsLm5hbWUub3IubmFtZXNwYWNlLm5hbWUub3IuZnVsbHkucXVhbGlmaWVkLmNsaWVudC5hcHAubmFtZT8ifQ.CZdEsvS_zigRvkM1VGQ0yHKyOkaouO3sd3pu8ZA-DN8`
    /**
     * {
  "token_id": "ABCDEFG",
  "iat": 1516239022,
  "machine_id": "ABCDEEF012345679",
  "client_id": "CLIENT00-XYZ/WHATEVER",
  "client_name": "Xyz Corp.",
  "max_logins": 10,
  "exp": 60000,
  "iss": "licensing.brilliantlink.app",
  "aud": "internal.name.or.namespace.name.or.fully.qualified.client.app.name?"
}
     * 
     */
    let connection: Connection;
    try {
      connection = await connect();
      await tokenBlacklist.add(connection, blcaklisted_token);      
      expect(await tokenBlacklist.isBlackListed(connection, blcaklisted_token)).toBe(true);
      expect(await tokenBlacklist.isBlackListed(connection, other_token)).toBe(false);
    }
    finally {
      connection && connection.close();
    }
  })
});
