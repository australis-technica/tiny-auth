import jwt from "jsonwebtoken";
/**
 * 
 */
export default function getTokenPayload(token: string, tokenKey?: string): any {
    const data = (jwt.decode(token) as { [key: string]: any });
    return tokenKey ? data[tokenKey] : data;
}