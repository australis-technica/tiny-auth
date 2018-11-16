import * as crypto from "crypto";
import { isString } from "util";
/** */
export interface Options {
  algorithm: string;
  password: string;
}
/** */
export default class Crypto {
  
  static algorithm = "aes-128-cbc";
  /** */

  /** */
  constructor(private password: string) {
    if (!isString(password)) {
      throw new Error("invalid password/passphrase (required)");
    }
    if (password.length < 16) {
      throw new Error("invalid password/passphrase length (required:>=16)");
    }
  }
  /** */
  encrypt = (text: string) => {    
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(Crypto.algorithm, new Buffer(this.password), iv);
    const encrypted = cipher.update(text);
    const finalBuffer = Buffer.concat([encrypted, cipher.final()]);
    const encryptedHex = `${iv.toString("hex")}:${finalBuffer.toString("hex")}`;
    return encryptedHex;
  };
  /** */
  decrypt = (text: string) => {    
    const encryptedArray = text.split(":");
    const iv = new Buffer(encryptedArray[0], "hex");
    const encrypted = new Buffer(encryptedArray[1], "hex");
    const decipher = crypto.createDecipheriv(
      Crypto.algorithm,
      new Buffer(this.password),
      iv,
    );
    const decrypted = decipher.update(encrypted);
    const clearText = Buffer.concat([decrypted, decipher.final()]).toString();
    return clearText;
  };
}
