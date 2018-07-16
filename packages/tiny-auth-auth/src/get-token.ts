import { getToken } from "@australis/token-tools/node";
/** */
export default function(req: {}): Promise<string> {
  try {
    return Promise.resolve(getToken(req as any));
  } catch (error) {
    return Promise.resolve(error);
  }
}
