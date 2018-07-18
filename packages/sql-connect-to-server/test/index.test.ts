import "@australis/load-env";
import { execSql } from "@australis/tiny-sql";
import connectToServer from "@australis/sql-connect-to-server";
import { join } from "path";
import { Connection } from "tedious";
const config = require(join(__dirname, "../.secrets/connection-string.json"));
describe((require(join(__dirname, "../package.json"))).name, () => {
    it("works", async () => {
        let connection: Connection;
        try {
            connection = await connectToServer();
            const r = await execSql(connection)<{ name }>("select name from sys.databases");
            if (r.error) {
                throw r.error;
            }
            const names = r.values.map(x => x.name).join(",");
            expect(names.indexOf("master") !== -1).toBe(true);

        } finally {
            connection && connection.close();
        }
    })
});