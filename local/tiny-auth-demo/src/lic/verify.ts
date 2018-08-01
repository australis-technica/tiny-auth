import jwt from "jsonwebtoken";
import secret from "./secret";
import _issuer from "./issuer";
/**
 * 
 * @param lic 
 * @param iss 
 */
export default function (lic: string): { [key: string]: any } {
    const issuer = _issuer();
    const verified = jwt.verify(lic, secret(), { issuer, }) as { [key: string]: any };
    const { iss } = verified;
    if (iss !== issuer) {
        throw new Error("Invalid issuer");
    }
    return verified;
}