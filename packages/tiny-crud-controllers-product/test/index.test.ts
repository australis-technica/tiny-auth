import { join } from "path";
import * as src from "../src"; 
/**
 * 
 */
describe(require(join(__dirname, "../package.json")).name, ()=> {
    it("works", ()=> {
       expect( typeof src.default).toBe("function")
    })
});