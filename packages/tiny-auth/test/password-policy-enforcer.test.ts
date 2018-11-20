import { join } from "path";
import src from "../src/password-policy-enforcer";
/** */
describe(require(join(__dirname, "../package.json")).name, () => {
    /**
     * 
     */
    it("works", async () => {
        const errors = src("P@55w0rd!");
        expect(errors.length).toBe(0);
    })
})