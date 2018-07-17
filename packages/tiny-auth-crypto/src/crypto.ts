import * as crypto from "crypto";
import { isString } from "util";
/** */
export interface Options {
  algorithm: string;
  password: string;
}
/** */
export const defaultOptions: Options = {
  // encryption with CTR
  algorithm: "aes-128-cbc",
  /** 0123456789ABCDEF */
  password: ""
};
/** */
export default class Crypto {
  /** */
  options: Options;
  /** */
  constructor(
    options: Partial<Options> & { password: string } = defaultOptions
  ) {
    this.options = Object.assign({}, defaultOptions, options);
    if (
      !isString(this.options.password) ||
      this.options.password.trim() === ""
    ) {
      throw new Error("invalid password/passphrase (required)");
    }
    if (this.options.password.length < 16) {
      throw new Error("invalid password/passphrase length (required:>=16)");
    }   
  }
  /** */
  encrypt = (text: string) => {
    const { algorithm, password, } = this.options;
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, new Buffer(password), iv);
    const encrypted = cipher.update(text);
    const finalBuffer = Buffer.concat([encrypted, cipher.final()]);
    const encryptedHex =`${iv.toString('hex')}:${finalBuffer.toString('hex')}`    
    return encryptedHex;
  };
  /** */
  decrypt = (text: string) => {
    const { algorithm, password, } = this.options;
    const  encryptedArray = text.split(':');
    const  iv = new Buffer(encryptedArray[0], 'hex');
    const  encrypted = new Buffer(encryptedArray[1], 'hex');
    const  decipher = crypto.createDecipheriv(algorithm, new Buffer(password), iv);
    const  decrypted = decipher.update(encrypted);
    const  clearText = Buffer.concat([decrypted, decipher.final()]).toString();
    return clearText;
  };
}
