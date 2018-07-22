import ExecSql from "@australis/tiny-sql-exec-sql";
import { Connection } from "tedious";
import { debugModule } from "@australis/create-debug";
import { Customer } from "./types";
import { TABLE_NAME } from "./constants";
/** */
const debug = debugModule(module);
/**
 * 
 * @param _req 
 * @param res 
 * @param next 
 */
export default async function all(connection: Connection) {    
    try {
        const execSql = ExecSql(connection);
        const result = await execSql<Customer>(`
        select * from ${TABLE_NAME}
        `).then(x => x.values);
        return result;
    } catch (error) {
        debug(error);
        throw error;
    }    
};