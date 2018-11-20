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
    if(not(exists(select top 1 name from sys.tables where name = '${tableName}')))
    create table [${tableName}]
    (
        id VARCHAR(1024) NOT NULL UNIQUE default NEWID(),
        token varchar(max) NOT NULL,        
        [exp] DATETIME NOT NULL,
        [iat] DATETIME NOT NULL
    )`);
        if (r.error) { return Promise.reject(r.error) };
        return Promise.resolve();
    }
}