import { join } from "path";
import * as src from "../src"; 
/**
 * 
 */
describe(require(join(__dirname, "../package.json")).name, ()=> {
    it("works", async ()=> {        
       expect( typeof src.default).toBe("function")
       process.env.APP_FEATURES="a";       
       expect(await src.default()).toMatchObject(["a"]);
       process.env.APP_FEATURES= undefined;       
       process.argv.push('--features=[a]')
       expect(await src.default()).toMatchObject(["a"]);
    })
});