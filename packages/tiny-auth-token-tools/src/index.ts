import decode from "jwt-decode";
/**
 * 
 */
export function getTokenPayload(token: string, tokenKey?: string): any {
    const data = (decode(token) as { [key: string]: any });
    return tokenKey ? data[tokenKey] : data;
}
/** 
 * in milliseconds
 */
export function getInAt(token: string) {
    if (!token) throw new Error("Can't get iat without token");
    const decoded: { [key: string]: any } = decode(token);
    if (!('iat' in decoded)) {
        throw new Error("missing iat from token");
    }
    if (typeof decoded.exp !== "number") throw new Error("invalid token iat");
    return decoded.iat * 1000;
}
/**
 * in milliseconds
 */
export function getTokenExpiration(token: any): number {
    if (!token) throw new Error("Can't get expiration date without token");
    const decoded: { [key: string]: any } = decode(token);
    if (!('exp' in decoded)) {
        throw new Error("missing exp from token");
    }
    if (typeof decoded.exp !== "number") throw new Error("invalid token exp");
    // WARNING: hack to make jsonwebtoken return the right expiration ? 
    return decoded.exp;
}
/** */
export function getTokenExpirationDate(token: any): Date {
    const date = new Date(getTokenExpiration(token)); // The 0 here is the key, which sets the date to the epoch
    // date.setUTCSeconds(getTokenExpiration(token));
    return date;
}
/** */
export function isTokenExpired(token: string) {
    try {
        const date = token ? getTokenExpirationDate(token) : null;
        if (date === null) {
            return false;
        }
        const now = new Date();
        const expired = !(date.valueOf() > now.valueOf());
        return expired;
    } catch (e) {
        console.log(e);
        return true;
    }
}
/** */
export function getTokenMillisecondsToExpire(token: string): number {
    if (isTokenExpired(token)) {
        return 0;
    }
    const date = getTokenExpirationDate(token);
    return (date.valueOf() - new Date(Date.now()).valueOf());
}
const warn = process.env.NODE_ENV !== 'production' ? console.error.bind(console) : () => { };
/** */
export function isValidToken(token: string | null | undefined): token is string {
    if (typeof token === "undefined" || token === null) {
        warn("no token");
        return false;
    }
    if (typeof token !== "string") {
        warn("invalid token type");
        return false;
    }
    if (token.trim() === "") {
        warn("Empty Token");
        return false;
    }
    return true;
}