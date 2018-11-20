import { join } from "path";
import validateCredentials from "../src/validate-credentials";
/** */
const crypto = {
    encrypt(text: string): string {
        return text;
    },
    decrypt(text: string): string{
        return text;
    }
}
/** */
const users = {
    byId(id: string) {
        return Promise.resolve({ password: "password"});
    }
}
/** */
describe(require(join(__dirname, "../package.json")).name, () => {
    /**
     * 
     */
    it("works", async () => {
        const user = await validateCredentials(crypto, users as any)("", "password");
        expect(user.password).toBe("password");
    })
})