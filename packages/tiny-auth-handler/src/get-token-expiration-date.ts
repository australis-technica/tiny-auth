import getTokenExpiration from "./get-token-expiration";
/** */
export default function getTokenExpirationDate(token: string): Date {
    const date = new Date(getTokenExpiration(token) * 1000); // The 0 here is the key, which sets the date to the epoch
    // date.setUTCSeconds(getTokenExpiration(token));
    return date;
}