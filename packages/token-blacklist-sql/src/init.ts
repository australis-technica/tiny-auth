import ExecSql from "@australis/tiny-sql-exec-sql";
import { Connection } from "tedious";
/**
 * 
 * @param connection 
 * @param tableName 
 */
export default function init(tableName: string) {
    /** */
    return async (connection: Connection) => {
        const r = await ExecSql(connection)(`
    if(not(exists(select * from sys.tables where name = '${tableName}' and type = 'U')))
    create table token_blacklist
    (
        id VARCHAR(1024) NOT NULL UNIQUE,
        [iat] DATETIME NOT NULL,
        /* tiome in seconds to expiration */
        [exp] int NOT NULL,
        token varchar(max) NOT NULL
    )`);
        if (r.error) { return Promise.reject(r.error) };
        return Promise.resolve();
    }
}