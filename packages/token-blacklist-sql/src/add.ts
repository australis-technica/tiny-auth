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
            const { iat, exp, token_id } = await decode(token);
            const r = await ExecSql(connection)(`
        insert into ${tableName} (id, iat, exp, token) values (@token_id, @iat, @exp, @token )
    `, { token, iat: new Date(iat), exp: new Date(exp * 1000), token_id });
            if (r.error) return Promise.reject(r.error);
            return Promise.resolve();
        } catch (error) {
            debug(error);
            return Promise.reject(error);
        }
    }

}