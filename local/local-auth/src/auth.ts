import {
  changePassword,
  getProfile,
  login,
  refresh,
} from "@australis/tiny-auth-express/lib/controllers";
import {
  authorize,
  requireRole,
  tokenBlackListMdw,
} from "@australis/tiny-auth-express/lib/middleware";
import tokenBlacklist from "./token-blacklist";
import { fromRequest } from "@australis/tiny-auth-get-token";
import validateCredentials from "@australis/tiny-auth-validate-credentials";
import passwordChanger from "@australis/tiny-auth-password-changer";
import passwordPolicyEnforcer from "@australis/tiny-auth-password-policy-enforcer";
/** */
import users from "@australis/tiny-auth-users";
import Crypto from "@australis/tiny-crypto";

const crypto = new Crypto(process.env.TINY_AUTH_SECRET);
/** */
export default {
  controllers: {
    changePassword: changePassword(
      passwordChanger(users, crypto, passwordPolicyEnforcer),
    ),
    getProfile: getProfile(users),
    login: login(validateCredentials(crypto, users)),
    refresh: refresh(fromRequest, tokenBlacklist),
  },
  middleware: {
    authorize: authorize(fromRequest),
    requireRole,
    tokenBlackList: tokenBlackListMdw(tokenBlacklist, fromRequest),
  },
};
