import { debugModule } from "@australis/create-debug";
import ExecSql from "@australis/tiny-sql-exec-sql";
import { Connection } from "tedious";
import { User } from "./types";
/** */
const debug = debugModule(module);
/** */
const tableKeys = ["displayName", "email", "roles", "password"];
/** 
 *
 */
export default async function update (connection: Connection,user: Partial<User> & { id: string}): Promise<User> {
    if(!user) return Promise.reject(new Error(`@param user: User required`));    
    try {
        const execSql = ExecSql(connection);
        /** */
        const current  = await execSql<User>(`select top 1 * from users where id = @id`, { id: user.id }).then(x => x.values[0]);
        if(!current || !current.id){
            return Promise.reject(new Error(`user Not Found`));
        }        
        const keys = Object.keys(user);
        let fields = keys.filter(key=> tableKeys.indexOf(key)!== -1).map(key=> `${key} = @${key}`).join(',');
        if(!fields || !fields.length) {
            return Promise.reject(`Nothing to update: keys:${keys}`);
        }
        /** */
        const r = await execSql<User>(`
            update users 
            set 
            ${fields}
            , updatedAt = GETDATE()
            where id = @id
        `, Object.assign(current, user));
        if(r.error){
            return Promise.reject(r.error);
        }
        // if(r.affected === ) { return Promise.reject(r.error); }
        // if(r.status === ) { return Promise.reject(r.error); }
        return execSql<User>(`select top 1 * from users where id = @id`, { id: user.id }).then(x => x.values[0]);
    } catch (error) {
        debug(error);
        throw error;
    }    
}