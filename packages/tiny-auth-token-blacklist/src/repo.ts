import { debugModule } from "@australis/create-debug";
import connect from "@australis/tiny-sql-connection-factory";
import create from "./create";
import jsonwebtoken from "jsonwebtoken";
import { Connection } from "tedious";
// ...
const debug = debugModule(module);
/** */
const decode = (token: string) => new Promise((resolve, reject) => {
    try {
        resolve(jsonwebtoken.decode(token) as any);
    } catch (error) {
        reject(error)
    }
});
/**
 * 
 */
const { add, isBlackListed, init } = create("token_blacklist", decode);
/** */
async function withConnection<R>(callback: (connection: Connection) => Promise<R>) {
    let connection: Connection;
    try {
        connection = await connect();
        const r = await callback(connection);
        return Promise.resolve(r);
    } catch (error) {
        debug(error);
        return Promise.reject(error);
    } finally {
        connection && connection.close();
    }
}
/** */
export default {
    add: (token: string) => withConnection(connection => add(connection, token)),
    isBlackListed: (token: string) => withConnection(connection => isBlackListed(connection, token)),
}
/** */
export {
    init
};
