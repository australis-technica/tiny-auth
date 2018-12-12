import { RequestLike } from "./types";
export function sync(req: RequestLike ): string {
  return (((req.headers["Authorization"] || req.headers["authorization"]) || "").split("Bearer ")[1]).trim()
}

/** */
export default function async(req: RequestLike): Promise<string> {
  try {
    const token = (((req.headers["Authorization"] || req.headers["authorization"]) || "").split("Bearer ")[1]).trim();
    return Promise.resolve(token);
  } catch (error) {
    return Promise.resolve(error);
  }
}
