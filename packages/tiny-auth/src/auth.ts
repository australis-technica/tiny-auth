/** */
import authorize from "./authorize";
import changePassword from "./change-password";
import getProfile from "./get-profile";
import getToken from "./get-token";
import login from "./login";
import refresh from "./refresh";
import requireRole from "./require-role";
import Sign from "./sign";
import tokenBlacklist from "./token-blacklist";
import { Users, Blacklist } from "./types";
/** */
export default (
  secret: string,
  issuer: string | undefined,
  audience: string | undefined,
  timeToExpire: number | undefined,
  users: Users,
  blacklist: Blacklist,
) => {
  const sign = Sign(secret,
    timeToExpire,
    issuer,
    audience);  
  return {
    /** controller */
    changePassword: changePassword(users),
    /** controller */
    getProfile: getProfile(users),
    /** controller */
    login: login(users, sign),
    /** controller */
    refresh: refresh(getToken,  sign, blacklist),
    /** middleware */
    authorize: authorize(getToken, () => Promise.resolve(secret), issuer),
    /** middleware */
    requireRole,
    /** middleware */
    tokenBlackList: tokenBlacklist(getToken,blacklist),    
  };
}