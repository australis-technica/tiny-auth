/**
 * TODO:
 */
export default function() {
  const s = process.env.TINY_LICENSEWARE_SECRET;
  if (!s || !s.length || s.length < 8) {
    throw new Error("Invalid Lic Secret");
  }
  return s;
}
