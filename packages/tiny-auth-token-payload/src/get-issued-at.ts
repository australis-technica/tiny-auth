import jwt from "jsonwebtoken";
/** 
 * in milliseconds
 */
export default function getInAt(token: string) {
    if (!token) throw new Error("Can't get iat without token");
    const decoded: { [key: string]: any } = jwt.decode(token) as any;;
    if (!('iat' in decoded)) {
        throw new Error("missing iat from token");
    }
    if (typeof decoded.exp !== "number") throw new Error("invalid token iat");
    return decoded.iat * 1000;
}