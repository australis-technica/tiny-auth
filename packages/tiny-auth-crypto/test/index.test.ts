import Crypto from "../src";
import { randomBytes } from "crypto";
/** */
describe("crypto", () => {
    it("works", () => {
        const secret = randomBytes(10).toString("base64");
        console.log("password: %s", secret);
        const crypto = new Crypto({ password: secret });
        expect(crypto.decrypt(crypto.encrypt("hello"))).toBe("hello");
    })
})