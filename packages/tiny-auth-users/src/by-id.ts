import { debugModule } from "@australis/create-debug";
import ExecSql from "@australis/tiny-sql-exec-sql";
import { Connection } from "tedious";
import { User } from "./types";
/** */
const debug = debugModule(module);
/** 
 * 
 */
export default (id: string) => async (connection: Connection) => {
    try {
        const execSql = ExecSql(connection);
        const result = await execSql<User>(`select top 1 * from users where id = @id`, { id }).then(x => x.values[0]);
        return result;
    } catch (error) {
        debug(error);
        throw error;
    }
}