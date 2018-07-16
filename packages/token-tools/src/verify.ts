import jwt from "jsonwebtoken";
import { DefaultOptions, getSecret, defaultOptions } from "./options";
/** */
export default async function(getToken: (req: {})=> Promise<string>, options?: DefaultOptions) {
  return async (req: {}) => {
    try {
      return Promise.resolve(jwt.verify(
        await getToken(req), getSecret(Object.assign({}, defaultOptions, options))
      ) as { profile: {}; token: any });
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
