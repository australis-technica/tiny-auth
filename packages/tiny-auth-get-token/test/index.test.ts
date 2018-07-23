import {fromRequest, fromRequestSync } from "../src";
import { join } from "path";
/** */
describe(require(join(__dirname, "../package.json")).name, () => {
    /**
     * 
     */
    it("gets token from request", async () => {
        const request  = { headers: {"Authorization": "Bearer token"} };
        let token  = await fromRequest(request)
        expect(token).toBe("token");
        token = fromRequestSync(request);
        expect(token).toBe("token");
    })
})