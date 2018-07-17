import { execSql as ExecSql} from "@australis/tiny-sql";
import { Connection } from "tedious";
import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);
/** */
export default (tableName: string)=> {
    /** */
    return async (connection: Connection, key: string, value: any)=> {
        try {
            const execSql = ExecSql(connection);
            await execSql(`
                update ${tableName} 
                    set [value] = '${JSON.stringify(value)}'
                    WHERE [key] = '${key}';`
                );
            return Promise.resolve();
        } catch (error) {
            debug(error);
            return Promise.reject(error)
        }
    }
}