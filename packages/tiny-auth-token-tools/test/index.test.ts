import sign from "../src/sign";
import { getTokenPayload } from "../src";
import { join } from "path";
/** */
describe(require(join(__dirname, "../package.json")).name, () => {
    it("signs & reads", () => {
        const signed = sign({ hello: "hello" }, { secret: "ABRACADABRA" });
        const payload = getTokenPayload(signed.token);
        expect(payload.hello).toBe("hello");
    })
})