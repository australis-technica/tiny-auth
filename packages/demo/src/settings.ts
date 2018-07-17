import sqlJsonTable from "@australis/sql-json-table";
import { Connection } from "tedious";
import { RequestHandler } from "express-serve-static-core";
import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);
/** DB */
const {
    get,
    init,
    defaults
} = sqlJsonTable("settings");
/** */
const constroller: RequestHandler = async (req, res, next) => {
    try {
        res.json( await get(connection, req.params.key))
    } catch (error) {
        debug(error)
        next(error);
    }
}
/**
 * 
 */
export default {
    db: {
        get,
        init,
        defaults: (connection: Connection) => defaults(connection, {
            appName: JSON.stringify("tiny-auth-demo"),
        }),
    },
    constroller
}