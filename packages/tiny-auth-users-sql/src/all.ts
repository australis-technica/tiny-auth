import { User } from "@australis/tiny-auth-core";
import { execSql as ExecSql } from "@australis/tiny-sql";
import { Connection } from "tedious";
import { debugModule } from "@australis/create-debug";
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