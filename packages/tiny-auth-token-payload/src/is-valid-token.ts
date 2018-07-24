import warn from "./warn";
import jwt from "jsonwebtoken";
/**
 * rename to lookLike a token
 */
export default function isValidToken(token: string | null | undefined): token is string {
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
    try {
        jwt.decode(token);
    } catch(e){
        warn(e);
    }
    return true;
}