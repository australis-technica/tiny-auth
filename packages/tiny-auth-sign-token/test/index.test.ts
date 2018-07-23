import "@australis/load-env";
import { join } from "path";
import src from "../src";
import jwt from "jsonwebtoken";
import { defaultOptions } from "../src/options";
/**
 * 
 */
describe(require(join(__dirname, "../package.json")).name, () => {
    it("works", async () => {
        const {token} = await src({ hello: "hello"});
        const decoded: any = jwt.decode(token);
        expect(decoded.hello).toMatch("hello");
        const verified: { exp: number, iat: number } = jwt.verify(token, process.env.SECRET) as any;        
        const exp = new Date(verified.exp * 1000);        
        const iat = new Date(verified.iat);
        const now = new Date(Date.now());
        const year = now.getFullYear();
        const month = now.getMonth();
        const date = now.getDate();
        expect(exp.getFullYear()).toBe(year);
        expect(exp.getMonth()).toBe(month);
        expect(exp.getDate()).toBe(date);        

        expect(iat.getFullYear()).toBe(year);
        expect(iat.getMonth()).toBe(month);
        expect(iat.getDate()).toBe(date);
        // Verify iat -exp  = timeToExpire as in lapse in seconds , more or less :)
        expect(verified.exp * 1000 - verified.iat - defaultOptions.timeToExpire * 1000).toBeLessThan(10);

    });
});
