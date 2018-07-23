import ExecSql from "@australis/tiny-sql-exec-sql";
import { Connection } from "tedious";
import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);
/**
 * 
 * @param connection  
 */
export default function clear(
    tableName: string,    
) {
    return async (connection: Connection) => {
        try {            
            let query = `delete ${tableName}` ;
            debug(query);            
            const r = await ExecSql(connection)(query);
            if (r.error) return Promise.reject(r.error);
            return Promise.resolve();
        } catch (error) {
            debug(error);
            return Promise.reject(error);
        }
    }

}