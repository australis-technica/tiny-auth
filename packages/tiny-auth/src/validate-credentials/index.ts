import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);
export type ValidateCredentials = (id: string, password: string) => Promise<{ password?: string }>;
/** */
export default function validateCredentials(
  crypto: { encrypt: (t: string) => string, decrypt(s: string): string },
  users: {
    byId(id: any): Promise<{ password?: string, disabled?: boolean, id?: string }>
  },
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
  return async (username: string, password: string): Promise<{}> => {
    const user = await users.byId(username);
    if (!user) {
      return null;
    }
    if (!user.password) {
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
