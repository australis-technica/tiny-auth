import { execSql as ExecSql } from "@australis/tiny-sql";
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
            const r = await ExecSql(connection)<{ token: string }>(`
                select top 1 token from ${tableName} where 
                id = @token_id OR token = @token
                `, { token_id, token });
            if (r.error) return Promise.reject(r.error);            
            return r.values && r.values.length &&  typeof r.values[0].token === "string" && r.values[0].token.trim() !== "";
        } catch (error) {
            debug(error);
            return Promise.reject(error);
        }
    }
}