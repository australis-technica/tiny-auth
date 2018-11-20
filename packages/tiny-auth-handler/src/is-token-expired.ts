import getTokenExpirationDate from "./get-token-expiration-date";
/** */
export default function isTokenExpired(token: string) {
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