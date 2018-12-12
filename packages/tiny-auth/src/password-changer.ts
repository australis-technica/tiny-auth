import { debugModule } from "@australis/create-debug";
import { User } from "./types";
export declare type PasswordRulePolicyEnforcer = (password: string) => string[];

export declare type PasswordChanger = (id: string, password: string, newPassword: string) => Promise<{}>;

export interface ICrypto {
    encrypt(text: string): string;
    decrypt(text: string): String
}

const debug = debugModule(module);

/** prettier-ignore */
/**
 * 
 */
export default (function passwordChanger(
    findOne: (id: string) => Promise<User>,
    update: (u: User) => Promise<any>,
    crypto: ICrypto,
    passwordRulePolicyEnforcer: PasswordRulePolicyEnforcer,
): PasswordChanger {
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
        const user = await findOne(id);
        if (!user) {
            return Promise.reject(new Error("User not found"));
        }
        /** */
        // TODO ?  user.allowBlankPassword/allowEMptyPassword/skipPasswordRules/ passwordRues.empty ...?
        const decrypted = user.password === "" ? user.password : tryDecrypt(user.password);
        if (decrypted !== password) {
            return Promise.reject(new Error("Invalid password"));
        }
        if (decrypted === newPassword) {
            return Promise.reject(new Error("can't repeat password"));
        }
        /** Enforce password policy  */
        const errors = passwordRulePolicyEnforcer(newPassword);

        if (errors && errors.length) {
            return Promise.reject(new Error(`invalid password: ` + errors.join(",")));
        }
        return update({ id: user.id, password: crypto.encrypt(newPassword) });
    }
});