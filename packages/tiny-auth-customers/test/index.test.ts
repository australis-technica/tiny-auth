import { join } from "path";
import * as src from "../src"; 
/**
 * 
 */
describe(require(join(__dirname, "../package.json")).name, ()=> {
    it("works", ()=> {
        expect( typeof src.table).toBe("function")
        expect( typeof src.repo).toBe("function")
    })
});