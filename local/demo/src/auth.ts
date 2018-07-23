import * as auth from "@australis/tiny-auth-auth";
import { changePassword, getProfile, login, refresh } from "@australis/tiny-auth-express/lib/controllers";
import { authorize, requireRole, tokenBlackListMdw } from "@australis/tiny-auth-express/lib/middleware";
import tokenBlacklist from "./token-blacklist";
import { fromRequest } from "@australis/tiny-auth-get-token";
import validateCredentials from "@australis/tiny-auth-validate-credentials";
import passwordChanger from "@australis/tiny-auth-password-changer";
import passwordPolicyEnforcer from "@australis/tiny-auth-password-policy-enforcer";
/** */
import users from "./users";
import crypto from "./crypto";
/** */
export default {
  controllers: {
    changePassword: changePassword(passwordChanger(users, crypto, passwordPolicyEnforcer)),
    getProfile: getProfile(users),
    login: login(validateCredentials(crypto, users), auth.signToken),
    refresh: refresh(fromRequest, auth.signToken, tokenBlacklist),
  },
  middleware: {
    authorize: authorize(fromRequest),
    requireRole,
    tokenBlackList: tokenBlackListMdw(tokenBlacklist, fromRequest, )
  }
};
