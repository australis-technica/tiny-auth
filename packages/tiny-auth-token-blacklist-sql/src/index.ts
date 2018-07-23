import init from "./init";
import isBlacklisted from "./is-blacklisted";
import add from "./add";
import { DecodeToken } from "./types";
/** */
export * from "./types";
/**
 * 
 * @param tableName 
 * @param decode 
 */
export default function createTokenBlacklist(tableName: string, decode: DecodeToken) {
    return {
        init: init(tableName),
        add: add(tableName, decode),
        isBlackListed: isBlacklisted(tableName, decode)
    }
}