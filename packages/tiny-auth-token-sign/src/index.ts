import signSync from "./sign-sync";
import { defaultOptions, DefaultOptions } from "./options";
export {
  signSync,
  DefaultOptions
}
/**
 * 
 * @param extra 
 */
export default function signToken<T extends {}>(extra: T, options = defaultOptions) {
  try {
    return Promise.resolve(signSync(extra, options));
  } catch (e) {
    return Promise.reject(e);
  }
}