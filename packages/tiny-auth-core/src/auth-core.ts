import { Users } from "./users";
import { ICrypto } from "./crypto";
import { PasswordChanger } from "./password-changer";
import { PasswordRulePolicyEnforcer } from "./password-rule-policy-enforcer";
import { ValidateCredentials } from "./validate-credentials";
import { TokenBlackList } from "./token-blacklist";
import { GetToken } from "./get-token";
import { SignToken } from "./sign-token";
/** */
export interface AuthCore {
    users: Users;
    crypto: ICrypto;
    passwordChanger: PasswordChanger;
    passwordRulePolicyEnforcer: PasswordRulePolicyEnforcer;
    validateCredentials: ValidateCredentials;
    tokenBlacklist: TokenBlackList;
    getToken: GetToken;
    signToken: SignToken;
}