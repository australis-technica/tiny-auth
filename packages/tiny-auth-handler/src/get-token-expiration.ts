import jwt from "jsonwebtoken";
/**
 * in milliseconds
 */
export default function getTokenExpiration(token: any): number {
    if (!token) throw new Error("Can't get expiration date without token");
    const decoded: { [key: string]: any } = jwt.decode(token) as any;
    if (!('exp' in decoded)) {
        throw new Error("missing exp from token");
    }
    if (typeof decoded.exp !== "number") throw new Error("invalid token exp");
    // WARNING: hack to make jsonwebtoken return the right expiration ? 
    return decoded.exp;
}