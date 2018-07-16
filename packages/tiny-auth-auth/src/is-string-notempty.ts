/** */
export default function isStringNotEmpty(x: any): x is string {
  return typeof x === "string" && x.trim() !== "";
}
