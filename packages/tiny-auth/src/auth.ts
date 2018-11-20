/** */
import users from "@australis/tiny-auth-users";
import Crypto from "@australis/tiny-crypto";
import { changePassword, getProfile, login, refresh } from "./controllers";
import { fromRequest } from "./get-token";
import { authorize, requireRole, tokenBlackListMdw } from "./middleware";
import passwordChanger from "./password-changer";
import passwordPolicyEnforcer from "./password-policy-enforcer";
import tokenBlacklist from "@australis/tiny-auth-token-blacklist";
import validateCredentials from "./validate-credentials";
/** */
export default (secret: string) => {
  const crypto = new Crypto(secret);
  return {
    controllers: {
      changePassword: changePassword(
        passwordChanger(users, crypto, passwordPolicyEnforcer),
      ),
      getProfile: getProfile(users.byId),
      login: login(validateCredentials(crypto, users)),
      refresh: refresh(fromRequest, tokenBlacklist),
    },
    middleware: {
      authorize: authorize(fromRequest),
      requireRole,
      tokenBlackList: tokenBlackListMdw(tokenBlacklist, fromRequest),
    },
  };
}