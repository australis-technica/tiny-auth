import { debugModule } from "@australis/create-debug";
import { ICrypto, User, Users, ValidateCredentials } from "@australis/tiny-auth-core";
import isStringNotEmpty from "./is-string-notempty";
const debug = debugModule(module);
/** */
export default function validateCredentials(
  crypto: ICrypto,
  users: Users,
): ValidateCredentials {
  const tryDecrypt = (s: string) => {
    try {
      return crypto.decrypt(s);
    } catch (error) {
      debug(error);
      return null;
    }
  };
  /** */
  return async (username: string, password: string): Promise<User> => {
    const user = await users.byId(username);
    if (!user) {
      return null;
    }
    if (!isStringNotEmpty(user.password)) {
      return user.password === password ? user : null;
    }
    const decrypted = tryDecrypt(user.password);
    if (!decrypted) {
      return null;
    }
    if (decrypted !== password) {
      return null;
    }
    if (user.disabled) {
      return Promise.reject(new Error(`user: ${user.id} disabled`));
    }
    return user;
  };
}
