import execSql from "@australis/tiny-sql-exec-sql";
import connect from "@australis/tiny-sql-connect";
import { Connection, ConnectionConfig } from "tedious";
import { init as initUsers, add, all, byId, findBy, update } from "../src";
import { User } from "@australis/tiny-auth-core";
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
const user = {
  id: "x",
  password: "x",
  displayName: "x",
  email: "x",
  roles: "x"
};

describe("init", () => {
  it("Works", async () => {
    await initTestDb();
    let connection: Connection;
    try {
      connection = await newConnection();
      const ok = await initUsers(connection);
      expect(ok).toBeTruthy();
      /** Expect table to exists */
      const table = await ExecSql(connection)<{ name: string }>(
        "select top 1 name from sys.tables where name = 'users'"
      ).then(x => x.values[0]);
      expect(table.name).toBe("users");
      /** Expect admin to exists */
      const admin = await ExecSql(connection)<User>(
        "select top 1 * from users where id = 'admin'"
      ).then(x => x.values[0]);
      expect(admin.id).toBe("admin");
      expect(admin.password).toBe("");
    } finally {
      connection && connection.close();
    }
  });
});
/** */
describe("all", () => {
  it("Works", async () => {
    let connection: Connection;
    try {
      connection = await newConnection();
      const users = await all(connection);
      // console.log("users %s", JSON.stringify(users, null, 2));
      // Expect admin to be there
      expect(users.length).toBe(1);
      expect(users[0].id).toBe("admin");
    } finally {
      connection && connection.close();
    }
  });
});
/** */
describe("add", () => {
  it("Works", async () => {
    let connection: Connection;
    try {
      connection = await newConnection();
      const x = await add(connection, user);
      expect(x).toMatchObject(user);
    } finally {
      connection && connection.close();
    }
  });
});

/** */
describe("by-id", () => {
  it("Works", async () => {
    let connection: Connection;
    try {
      connection = await newConnection();
      const user = await byId(connection, "x");
      expect(user.id).toBe("x");
    } finally {
      connection && connection.close();
    }
  });
});
/** */
describe("find-by", () => {
  it("Works", async () => {
    let connection: Connection;
    try {
      connection = await newConnection();
      expect((await findBy(connection, "id", "admin"))[0].id).toBe("admin");
      expect((await findBy(connection, "email", "admin@localhost"))[0].id).toBe(
        "admin"
      );
      expect((await findBy(connection, "displayName", "admin"))[0].id).toBe(
        "admin"
      );
    } finally {
      connection && connection.close();
    }
  });
});
/** */
describe("update", () => {
  it("Works", async () => {
    let connection: Connection;
    try {
      connection = await newConnection();
      const updated = {
        id: "x",
        displayName: "xx",
        email: "xx",
        password: "xx",
        roles: "xx"
      };
      const user = await update(connection, updated);
      expect(user).toMatchObject(updated);
    } finally {
      connection && connection.close();
    }
  });
});
