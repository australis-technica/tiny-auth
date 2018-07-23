import getTokenExpiration from "./get-token-expiration";
/** */
export default function getTokenExpirationDate(token: any): Date {
    const date = new Date(getTokenExpiration(token)); // The 0 here is the key, which sets the date to the epoch
    // date.setUTCSeconds(getTokenExpiration(token));
    return date;
}