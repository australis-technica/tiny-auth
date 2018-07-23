import "@australis/load-env";
import { join } from "path";
import src from "../src";
import jwt from "jsonwebtoken";
/**
 * 
 */
describe(require(join(__dirname, "../package.json")).name, () => {
    it("works", async () => {
        const {token} = await src({ hello: "hello"});
        const decoded: any = jwt.decode(token);
        expect(decoded.hello).toMatch("hello");
    });
});
