import getTokenSync from "./from-request-sync";
import { RequestLike } from "./types";
/** */
export default function fromRequest(req: RequestLike): Promise<string> {
  try {
    return Promise.resolve(getTokenSync(req as any));
  } catch (error) {
    return Promise.resolve(error);
  }
}
