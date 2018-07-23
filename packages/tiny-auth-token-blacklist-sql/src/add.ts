import ExecSql from "@australis/tiny-sql-exec-sql";
import { Connection } from "tedious";
import { debugModule } from "@australis/create-debug";
import { DecodeToken } from "./types";
const debug = debugModule(module);
/**
 * 
 * @param connection 
 * @param token 
 */
export default function add(
    tableName: string,
    decode: DecodeToken
) {
    return async (
        connection: Connection,
        token: string) => {
        try {
            const decoded= await decode(token);
            // ...
            let params = {
                // ...
            };
            let query;
            if (decoded.token_id) {
                params = Object.assign(params, { token_id: decoded.token_id, });
                query = `
                /* token-blacklist-add with-id*/
                insert into [${tableName}] (id, token, iat, exp ) values ( @token_id,  @token, @iat, @exp )
                /* token-blacklist-add-end */
                `;
            } else {
                /** id = newid() */
                query = `
                /* token-blacklist-add no-id*/
                insert into [${tableName}] (token, iat, exp) values (@token, @iat, @exp )
                /* token-blacklist-add-end */
                `;
            }
            debug(query);
            const p = { ...params, token, iat: new Date(decoded.iat), exp: new Date(decoded.exp * 1000) };
            const r = await ExecSql(connection)(query, p);
            if (r.error) return Promise.reject(r.error);
            return Promise.resolve();
        } catch (error) {
            debug(error);
            return Promise.reject(error);
        }
    }

}