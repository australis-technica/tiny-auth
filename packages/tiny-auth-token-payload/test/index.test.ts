import "@australis/load-env";
import { join } from "path";
import { getIssuedAt, getTokenExpiration, getTokenExpirationDate, getTokenMillisecondsToExpire, getTokenPayload, isTokenExpired, isValidToken } from "../src";
import sign from "@australis/tiny-auth-sign-token";
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
        const hello = "hello";
        const { token } = await sign({
            hello
        });
        // IAT
        const iat = getIssuedAt(token);
        const diff = now - iat;
        // Wrong !
        expect(diff).toBeLessThan(10);
        expect(diff).toBeGreaterThan(-1);
        expect(Number.isInteger(diff)).toBeTruthy();
        expect(sameDate(new Date(now), new Date(iat))).toBe(true);
        // Exp
        const exp = getTokenExpiration(token) * 1000;
        console.log("exp: %s", new Date(exp));
        expect(exp).toBeGreaterThan(now);
        expect(sameDate(new Date(exp), new Date(now))).toBeTruthy();
        const AN_HOUR_IN_SECONDSS = 60 * 60;
        expect(Math.ceil((exp - iat) / 1000)).toBe(AN_HOUR_IN_SECONDSS);
        const expirationDate = getTokenExpirationDate(token);
        expect(expirationDate.toString()).toBe(new Date(exp).toString())
        // timeToExpire : WRONG!
        const timeToExpire = getTokenMillisecondsToExpire(token, /*from:*/ iat);
        expect(timeToExpire).toBeLessThanOrEqual(AN_HOUR_IN_SECONDSS * 1000);
        expect(timeToExpire).toBeGreaterThan(-1);
        expect(isValidToken(token)).toBeTruthy();
        expect(isTokenExpired(token)).toBeFalsy();
        expect(getTokenPayload(token)).toMatchObject({
            hello
        });
    })
});