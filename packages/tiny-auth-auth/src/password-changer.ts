import { Users, PasswordRulePolicyEnforcer, ICrypto , PasswordChanger} from "@australis/tiny-auth-core";
import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);

export default (function (
    users: Users,
    crypto: ICrypto,
    passwordRulePolicyEnforcer: PasswordRulePolicyEnforcer,
) : PasswordChanger {
    /** */
    const tryDecrypt = (s: string) => {
        try {
            return crypto.decrypt(s);
        } catch (error) {
            debug(error);
            return null;
        }
    };
    /** Asume Authenticated */
    return async (id: string, password: string, newPassword: string) => {
        /** */
        const user = await users.byId(id);
        if (!user) {
            return Promise.reject(new Error("User not found"));
        }
        const decrypted = tryDecrypt(user.password);
        if (decrypted !== password) {
            return Promise.reject(new Error("Invalid password"));
        }
        if (decrypted === newPassword) {
            return Promise.reject(new Error("can't repeat password"));
        }
        /** Enforce password policy  */
        const errors = passwordRulePolicyEnforcer(user.password);

        if (errors && errors.length) {
            Promise.reject(new Error(`invalid password: ` + errors.join(",")));
        }
        return users.update({ id: user.id, password: crypto.encrypt(newPassword) });
    }
});