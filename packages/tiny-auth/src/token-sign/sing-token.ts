import signSync from "./sign-sync";
import { defaultOptions } from "./options";
import { DefaultOptions } from "./types";
/**
 *
 * @param extra
 */
export default function signToken<T extends {}>(
  extra: T,
  options: DefaultOptions = defaultOptions
) {
  try {
    return Promise.resolve(signSync(extra, options));
  } catch (e) {
    return Promise.reject(e);
  }
}
