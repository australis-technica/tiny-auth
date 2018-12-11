/** */
import Crypto from "@australis/tiny-crypto";
import { changePassword, getProfile, login, refresh } from "./controllers";
import { fromRequest } from "./get-token";
import { authorize, requireRole, tokenBlackListMdw } from "./middleware";
import passwordChanger from "./password-changer";
import passwordPolicyEnforcer from "./password-policy-enforcer";

import validateCredentials from "./validate-credentials";
import { FindUser, UpdateUser } from "./types";
/** */
export default (
  secret: string,
  findUser: FindUser,
  updateUser: UpdateUser,
  isBlackListed: (token: string) => Promise<boolean>,
  addToBlackList: (toke: string) => Promise<any>,
) => {
  const crypto = new Crypto(secret);
  return {
    controllers: {
      changePassword: changePassword(
        passwordChanger(findUser, updateUser, crypto, passwordPolicyEnforcer),
      ),
      getProfile: getProfile(findUser),
      login: login(validateCredentials(crypto, findUser)),
      refresh: refresh(fromRequest, isBlackListed, addToBlackList)
    },
    middleware: {
      authorize: authorize(fromRequest),
      requireRole,
      tokenBlackList: tokenBlackListMdw(fromRequest, isBlackListed),
    },
  };
}