import Crypto from "../src";
describe("crypto", () => {
    it("works", () => {
        const crypto = new Crypto({ password: "ABCDEF0123456789" });
        expect(crypto.decrypt(crypto.encrypt("hello"))).toBe("hello");
    })
})