import * as auth from "@australis/tiny-auth-auth";
import { changePassword, getProfile, login, refresh } from "@australis/tiny-auth-express/lib/controllers";
import { authorize, requireRole, tokenBlackListMdw } from "@australis/tiny-auth-express/lib/middleware";
import tokenBlacklist from "./token-blacklist";
import { fromRequest } from "@australis/tiny-auth-get-token";
import validateCredentials from "@australis/tiny-auth-validate-credentials";
/** */
import users from "./users";
import crypto from "./crypto";
/** */
export default {
  controllers: {
    changePassword: changePassword(auth.passwordChanger(users, crypto, auth.passwordRulePolicyEnforcer)),
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
