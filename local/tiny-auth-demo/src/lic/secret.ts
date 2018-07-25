const s = process.env.SECRET;
if (!s || !s.length || s.length < 8) {
    throw new Error("Invalid Lic Secret");
}
/**
 * TODO:
 */
export default function () {
    return s;
}