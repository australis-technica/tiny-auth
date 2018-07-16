import sign from "../src/sign";
import { getTokenPayload } from "../src";
/** */
describe("token-tools", () => {
    it("signs & reads", () => {
        const signed = sign({ hello: "hello" }, { secret: "ABRACADABRA" });
        const payload = getTokenPayload(signed.token);
        expect(payload.hello).toBe("hello");
    })
})