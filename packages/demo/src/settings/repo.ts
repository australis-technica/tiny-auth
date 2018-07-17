import sqlJsonTable from "@australis/sql-json-table";
import { Connection } from "tedious";
/** DB */
const {
    get,
    init,
    defaults
} = sqlJsonTable("settings");
/**
 * 
 */
export default {
    get,
    init,
    defaults: (connection: Connection) => defaults(connection, {
        // app default/initial values
        appName: JSON.stringify("tiny-auth-demo"),
    }),
}