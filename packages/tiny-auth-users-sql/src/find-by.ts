import { User } from "@australis/tiny-auth-core";
import { execSql as ExecSql } from "@australis/tiny-sql";
import { Connection } from "tedious";
import { debugModule } from "@australis/create-debug";
/** */
const debug = debugModule(module);
/** 
 * 
 */
export default async function findBy (connection: Connection, key: keyof User, value: string): Promise<User[]> {    
    try {
        const execSql = ExecSql(connection);
        let query;
        switch(key){
            case 'id': {
                query = `select * from users where ${key} = @value`;
                break;
            }
            case 'email': {
                query = `select * from users where ${key} = @value`;
                break;
            }
            // case 'roles': {
            //     query = `select * from users where ${key} = @value`;
            //     break;
            // }
            case 'displayName': {
                query = `select * from users where ${key} = @value`;
                break;
            }
            default : {
                return Promise.reject(`FindBy: ${key} NOT IMPLEMNTED`);
            }
        }
        return execSql<User>(query, { key, value }).then(x=>x.values );        
    } catch (error) {
        debug(error);
        throw error;
    }    
}