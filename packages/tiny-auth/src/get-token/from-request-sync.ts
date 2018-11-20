import { RequestLike } from "./types";
/** */
export default function fromRequestSync(req: RequestLike ): string {
  return (((req.headers["Authorization"] || req.headers["authorization"]) || "").split("Bearer ")[1]).trim()
}
