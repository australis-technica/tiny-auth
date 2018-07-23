import { join } from "path";
import * as src from "../src"; 
/**
 * 
 */
describe(require(join(__dirname, "../package.json")).name, ()=> {
    it("works", ()=> {
       expect(src.default).toBe("not-a-module")
    })
});