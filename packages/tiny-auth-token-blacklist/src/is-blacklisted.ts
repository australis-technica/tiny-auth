import ExecSql from "@australis/tiny-sql-exec-sql";
import { Connection } from "tedious";
import { debugModule } from "@australis/create-debug";
import { DecodeToken } from "./types";
const debug = debugModule(module);
/**
 * 
 * @param tableName 
 * @param decode 
 */
export default function isBlackListed(tableName: string, decode: DecodeToken) {
    return async (connection: Connection, token: string): Promise<boolean> => {
        try {
            const { token_id } = await decode(token);
            let query;
            let params;
            if (token_id) {
                query = `
                select top 1 * from ${tableName} where 
                id = @token_id OR token = @token
                `;
                params = {
                    token_id,
                    token
                }
            } else {
                query = `
                select top 1 * from ${tableName} where token = @token
                `;
                params = {
                    token
                }
            }
            const r = await ExecSql(connection)<{ token: string }>(query, params);
            if (r.error) {
                return Promise.reject(r.error);
            }
            const ok = r.values && r.values.length > 0 && typeof r.values[0].token === "string" && r.values[0].token.trim() !== "";
            return Promise.resolve(ok);
        } catch (error) {
            debug(error);
            return Promise.reject(error);
        }
    }
}