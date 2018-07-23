import sign from "@australis/tiny-auth-token-tools/lib/sign";
/**
 * 
 * @param extra 
 */
export default function signToken<T extends {}>(extra: T) {
  try {
    return Promise.resolve(sign(extra));
  } catch (e) {
    return Promise.reject(e);
  }
}