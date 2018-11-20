import { debugModule } from "@australis/create-debug";
import ExecSql from "@australis/tiny-sql-exec-sql";
import { Connection } from "tedious";
import { User } from "./types";
/** */
const debug = debugModule(module);
/** 
 * 
 */
export default async function add(connection: Connection, user: User): Promise<User> {
    try {
        const execSql = ExecSql(connection);
        await execSql<User>(`
        insert into users 
            (id, displayName, password, roles, email) 
        values 
            ( @id, @displayName, @password, @roles, @email)
        `, user);
        return execSql<User>("select top 1 * from users where id = @id", { id: user.id }).then(x => x.values[0]);
    } catch (error) {
        debug(error);
        throw error;
    }
}