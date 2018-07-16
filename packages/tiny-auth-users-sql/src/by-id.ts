import { User } from "@australis/tiny-auth-core";
import { execSql as ExecSql } from "@australis/tiny-sql";
import { Connection } from "tedious";
import { debugModule } from "@australis/create-debug";
/** */
const debug = debugModule(module);
/** 
 * 
 */
export default async function byId (connection: Connection, id: string) {    
    try {
        const execSql = ExecSql(connection);
        const result = await execSql<User>(`select top 1 * from users where id = @id`, { id }).then(x => x.values[0]);
        return result;
    } catch (error) {
        debug(error);
        throw error;
    }    
}