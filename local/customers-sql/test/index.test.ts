process.env.NODE_ENV = "test";
import "@australis/load-env";
import connect from "@australis/tiny-sql-connection-factory";
import ExecSql from "@australis/tiny-sql-exec-sql";
import { join } from "path";
import * as src from "../src";
import connectToServer from "@australis/sql-connect-to-server";
import withSqlConnection from "@australis/sql-with-sql-connection";
/** */
beforeAll(async () => {  
  await withSqlConnection(connectToServer, con =>
    ExecSql(con)(
      "if(exists(select name from sys.databases where name = 'testdb')) drop database testdb"
    )
  );
  await withSqlConnection(connectToServer, con =>
    ExecSql(con)(
      "if(not(exists(select name from sys.databases where name = 'testdb'))) create database testdb"
    )
  );
});
/**
 *
 */
describe(require(join(__dirname, "../package.json")).name, () => {
  it("works", async () => {
    const ok = await withSqlConnection(connect, src.init);
    expect(ok).toBe(true);
    const _new = await withSqlConnection(connect, con =>
      src.add(con, { id: "x", displayName: "x", email: "x@mail" })
    );
    const { id, displayName, enabled, email, createdAt, updatedAt } = _new;
    expect(id).toBe("x");
    expect(displayName).toBe("x");
    expect(enabled).toBe(false);
    expect(email).toBe("x@mail");
    // ...    
    const today = new Date(Date.now())
      .toString()
      .split(" ")
      .slice(0, 4)
      .join(" ");
    expect(
      new Date(updatedAt)
        .toString()
        .split(" ")
        .slice(0, 4)
        .join(" ")
    ).toMatch(today);
    expect(
      new Date(createdAt)
        .toString()
        .split(" ")
        .slice(0, 4)
        .join(" ")
    ).toMatch(today);
    const all = await withSqlConnection(connect, src.all);
    expect(all[0].id).toBe("x");
    const y = await withSqlConnection(connect, c=> src.update(c, { id: "x", displayName: "y"}));
    expect(y.displayName).toBe("y");
  });
});
