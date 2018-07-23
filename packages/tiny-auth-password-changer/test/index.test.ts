import { join } from "path";
import passwordChanger from "../src";
const users = (user: {})=> ({
    byId(x: string){ return Promise.resolve(user)},
    update(u: {}){ return Promise.resolve(Object.assign({}, user, u))}
});
const crypto = {
    encrypt(text: string){ return text;},
    decrypt(text: string){ return text;}
};
const passwordRules = (x: string): string[] => [];
/** */
describe(require(join(__dirname, "../package.json")).name, () => {
    // ...
    it("works", async () => {
        const changer = passwordChanger(users({ id: "x", password: "x"}) as any, crypto, passwordRules)
        const user = await changer("", "x", "y").catch(e => e);
        expect(user.password).toBe("y")
    })
})