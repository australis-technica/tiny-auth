import "@australis/load-env";
import { join } from "path";
import { getIssuedAt, getTokenExpiration, getTokenExpirationDate, getTokenMillisecondsToExpire, getTokenPayload } from "../src";
import sign from "@australis/tiny-auth-sign-token";
/**
 * 
 */
describe(require(join(__dirname, "../package.json")).name, () => {
    it("works", async () => {
        const now = Date.now();
        const { token } = await sign({});
        expect(now - getIssuedAt(token)).toBe(10);
    })
});