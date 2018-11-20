import "@australis/load-env";
import { join } from "path";
import { getIssuedAt, getTokenExpiration, getTokenExpirationDate, getTokenMillisecondsToExpire, getTokenPayload, isTokenExpired, isValidToken } from "../src/payload";
import { signToken as sign } from "@australis/tiny-auth-token-sign";
/** */
function sameDate(date: Date, other: Date) {
    return date.getFullYear() == other.getFullYear()
        && date.getMonth() === other.getMonth()
        && date.getDate() === other.getDate()
}
/**
 * 
 */
describe(require(join(__dirname, "../package.json")).name, () => {
    it("works", async () => {
        const now = Date.now();
        const AN_HOUR_IN_SECONDS = 60 * 60;
        const timeToExpire = 60;
        const payload = {
            array: [1, 2],
            nested: {
                hello: "hello"
            },
            iss: "me",
            aud: "you",
            iat: now,
            exp: Math.floor(now / 1000) + timeToExpire
        };
        const { token } = await sign(payload);
        // IAT
        const iat = getIssuedAt(token);
        const exp = getTokenExpiration(token) * 1000;
        const expirationDate = getTokenExpirationDate(token);
        const timeToExpireFromIat = getTokenMillisecondsToExpire(token, /*from:*/ iat);
        const timeToExpireFromNow = getTokenMillisecondsToExpire(token, /*from:*/ now);
        expect(sameDate(new Date(now), new Date(iat))).toBe(true);
        expect(exp).toBeGreaterThan(now);
        expect(sameDate(new Date(exp), new Date(now))).toBeTruthy();
        expect(expirationDate.toString()).toBe(new Date(exp).toString())
        // rounding diff
        expect(now + timeToExpireFromIat - AN_HOUR_IN_SECONDS * 1000 - now).toBeLessThanOrEqual(5);
        expect(isValidToken(token)).toBeTruthy();
        expect(isTokenExpired(token)).toBeFalsy();
        /**
         * 
         */
        expect(getTokenPayload(token)).toMatchObject(Object.assign(payload, {
            iat,// decoded
            exp: exp / 1000 // decoded
        }));
        expect(isValidToken("")).toBeFalsy();
    })
});