/** */
export default function getToken(req: { headers: { [key: string]: string } }): string {
  return (((req.headers["Authorization"] || req.headers["authorization"]) || "").split("Bearer ")[1]).trim()
}
