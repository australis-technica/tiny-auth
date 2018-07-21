import * as auth from "@australis/tiny-auth-auth";
import { changePassword, getProfile, login, refresh } from "@australis/tiny-auth-express/lib/controllers";
import { authorize, requireRole, tokenBlackListMdw } from "@australis/tiny-auth-express/lib/middleware";
import tokenBlacklist from "./token-blacklist";
/** */
import users from "./users";
import crypto from "./crypto";
/** */
export default {
  controllers: {
    changePassword: changePassword(auth.passwordChanger(users, crypto, auth.passwordRulePolicyEnforcer)),
    getProfile: getProfile(users),
    login: login(auth.validateCredentials(crypto, users), auth.signToken),
    refresh: refresh(auth.getToken, auth.signToken, tokenBlacklist),
  },
  middleware: {
    authorize: authorize(auth.getToken),
    requireRole,
    tokenBlackList: tokenBlackListMdw(tokenBlacklist, auth.getToken, )
  }
};
