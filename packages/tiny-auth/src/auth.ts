/** */
import Crypto from "@australis/tiny-crypto";

import getToken from "./get-token";
import passwordChanger from "./password-changer";
import passwordPolicyEnforcer from "./password-policy-enforcer";
import validateCredentials from "./validate-credentials";
import { FindUser, UpdateUser } from "./types";
import authorize from "./authorize";
import requireRole from "./require-role";
import tokenBlacklist from "./token-blacklist";
import changePassword from "./change-password";
import getProfile from "./get-profile";
import login from "./login";
import refresh from "./refresh";
import Sign from "./sign";
/** */
export default (
  secret: string,
  issuer: string | undefined,
  audience: string | undefined,
  timeToExpire: number | undefined,
  findUser: FindUser,
  updateUser: UpdateUser,
  isBlacklisted: (token: string) => Promise<boolean>,
  addToBlacklist: (toke: string) => Promise<any>,
) => {
  const crypto = new Crypto(secret);

  const sign = Sign(secret,
    timeToExpire,
    issuer,
    audience);

  return {
    /** controller */
    changePassword: changePassword(
      passwordChanger(findUser, updateUser, crypto, passwordPolicyEnforcer),
    ),
    /** controller */
    getProfile: getProfile(findUser),
    /** controller */
    login: login(validateCredentials(crypto, findUser), sign),
    /** controller */
    refresh: refresh(getToken, isBlacklisted, addToBlacklist, sign),
    /** middleware */
    authorize: authorize(getToken, () => Promise.resolve(secret), issuer),
    /** middleware */
    requireRole,
    /** middleware */
    tokenBlackList: tokenBlacklist(getToken, isBlacklisted),
    /** util */
    crypto
  };
}