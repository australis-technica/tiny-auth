import * as tokenTools from "@australis/token-tools/node";
/**
 * 
 * @param extra 
 */
export default function signToken<T extends {}>(extra: T) {
  try {
    return Promise.resolve(tokenTools.sign(extra));
  } catch (e) {
    return Promise.reject(e);
  }
}