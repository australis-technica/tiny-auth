import isTokenExpired from "./is-token-expired";
import getTokenExpirationDate from "./get-token-expiration-date";
/** */
export default function getTokenMillisecondsToExpire(token: string): number {
    if (isTokenExpired(token)) {
        return 0;
    }
    const date = getTokenExpirationDate(token);
    return (date.valueOf() - new Date(Date.now()).valueOf());
}