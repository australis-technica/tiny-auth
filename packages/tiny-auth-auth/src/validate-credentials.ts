import { debugModule } from "@australis/create-debug";
import { Users, ValidateCredentials, ICrypto } from "@australis/tiny-auth-core";
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
  return async (username: string, password: string) => {
    const result = await users.byId(username);
    if (!result) {
      return null;
    }
    if (!isStringNotEmpty(result.password)) {
      return result.password === password ? result : null;
    }
    const decrypted = tryDecrypt(result.password);
    if (!decrypted) {
      return null;
    }
    if (decrypted !== password) {
      return null;
    }
    return result;
  };
}
