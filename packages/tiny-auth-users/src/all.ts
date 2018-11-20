import { debugModule } from "@australis/create-debug";
import ExecSql from "@australis/tiny-sql-exec-sql";
import { Connection } from "tedious";
import { User } from "./types";
/** */
const debug = debugModule(module);
/**
 * 
 * @param _req 
 * @param res 
 * @param next 
 */
export default async function (connection: Connection) {
    try {
        const execSql = ExecSql(connection);
        const result = await execSql<User>(`select * from users`).then(x => x.values);
        return result;
    } catch (error) {
        debug(error);
        throw error;
    }
};