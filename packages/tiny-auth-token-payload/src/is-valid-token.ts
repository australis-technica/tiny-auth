import warn from "./warn";
/** */
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
    return true;
}