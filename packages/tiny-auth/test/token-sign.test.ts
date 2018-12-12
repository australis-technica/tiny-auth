
// import { join } from "path";
// import { signSync , signToken as sign } from "../src/token-sign";
// import validate from "../src/validate";
// import jwt from "jsonwebtoken";
// import { defaultOptions } from "../src/token-sign/options";
// /**
//  *
//  */
// describe(require(join(__dirname, "../package.json")).name, () => {
//   it("exp calc", () => {
//     const timeToExpire = 60;
//     const now = Date.now();
//     const secondsFromEpoc = Math.floor(now / 1000);
//     const exp /*seconds*/ = secondsFromEpoc + /*timeToExpire:*/ timeToExpire;
//     // rounding ....
//     expect(now - exp * 1000 - timeToExpire * 1000).toBeLessThanOrEqual(5);
//   });
//   it("works", async () => {
//     const { token } = await sign({ hello: "hello", iss: "me", aud: "you" });
//     const decoded: any = jwt.decode(token);
//     expect(decoded.hello).toMatch("hello");
//     expect(decoded.iss).toBe("me");
//     expect(decoded.aud).toBe("you");
//     const verified: { exp: number; iat: number } = jwt.verify(
//       token,
//       process.env.SECRET
//     ) as any;
//     const exp = new Date(verified.exp * 1000);
//     const iat = new Date(verified.iat);
//     const now = new Date(Date.now());
//     const year = now.getFullYear();
//     const month = now.getMonth();
//     const date = now.getDate();
//     console.log("exp: %s, iat: %s, now: %s", exp, iat, now);
//     expect(exp.getFullYear()).toBe(year);
//     expect(exp.getMonth()).toBe(month);
//     expect(exp.getDate()).toBe(date);
//     expect(iat.getFullYear()).toBe(year);
//     expect(iat.getMonth()).toBe(month);
//     expect(iat.getDate()).toBe(date);
//     // Verify iat -exp  = timeToExpire as in lapse in seconds , more or less, becuase of rounding :)
//     expect(
//       verified.exp * 1000 - verified.iat - defaultOptions.timeToExpire * 1000
//     ).toBeLessThanOrEqual(5);
//   });
//   it("validates", () => {
//     validate(signSync({}).token);
//     validate(signSync({ fingerprint: "xyz" }).token, { fingerprint: "xyz" });
//     validate(signSync({ fingerprint: undefined }).token, { fingerprint: "xyz" });
//   });
//   it("!validates", () => {
//     expect(() => {
//       validate("");
//     }).toThrowError();
//     expect(() => {
//       validate(signSync({ fingerprint: "xyz" }).token);
//     }).toThrowError();
//     expect(() => {
//       validate(signSync({ fingerprint: "xyz" }).token, { fingerprint: "x" });
//     }).toThrowError();
//     expect(() => {
//       validate(signSync({}, { secret: "xyz" }).token, {});
//     }).toThrowError();
//     expect(() => {
//       validate(signSync({}, { iss: "me" }).token);
//     }).toThrowError();
//   });
// });
