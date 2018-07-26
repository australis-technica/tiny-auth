import signSync from "./sign-sync";
import { defaultOptions } from "./options";
/**
 *
 * @param extra
 */
export default function signToken<T extends {}>(
  extra: T,
  options = defaultOptions
) {
  try {
    return Promise.resolve(signSync(extra, options));
  } catch (e) {
    return Promise.reject(e);
  }
}
