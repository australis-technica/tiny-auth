process.env.SECRET = "ABRACADABRA123545";
import { join } from "path";
import sign from "../src/lic/sign";
import createRequest from "../src/lic/create-request";
import jwt from "jsonwebtoken";

function toDateString(date: Date, f?: (year: number, month: number, day: number) => { year: number, month: number, day: number }) {
    f = f || ((year, month, day) => ({ year, month, day }));
    const { year, month, day } = f(date.getFullYear(), date.getMonth(), date.getDate());
    return `${year}-${month}-${day}`;
}

/** */
describe(require(join(__dirname, "../package.json")).name, () => {
    /** */
    it("timeToExpire:works", () => {
        new Date(2147483647 * 1000)
        // Upper Limit = 2147483647  * 1000 = Tue Jan 19 2038 05:14:07 GMT+0200 (South Africa Standard Time)
        // Lower Limit = -2147483648  * 1000 = Fri Dec 13 1901 22:15:52 GMT+0130 (South Africa Standard Time)
        const now = Date.now();
        const aDay = 24 * 60 * 60 * 1000;
        const exp = new Date(now + aDay);
        const tomorrow = toDateString(new Date(now), (year, month, day) => ({ year, month, day: day + 1 }));
        expect(toDateString(exp)).toBe(tomorrow);
        const token = sign(createRequest({ token_id: "0", exp }), {});
        const decoded: any = jwt.decode(token);
        const expiryDateInSeconds = decoded.exp;
        const expiryDate = new Date(expiryDateInSeconds * 1000);
        expect(toDateString(expiryDate)).toBe(tomorrow);
        const diff = expiryDate.valueOf() - new Date(now).valueOf();
        expect(diff).toBe(aDay);
    })
})