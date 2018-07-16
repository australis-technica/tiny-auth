import * as crypto from "crypto";
import { isString } from "util";
/** */
export interface Options {
  algorithm: string;
  password: string;
  ivy: string;
}
/** */
export const defaultOptions: Options = {
  // encryption with CTR
  algorithm: "aes-128-cbc",
  /** 0123456789ABCDEF */
  password: "",
  /** 1234123412341234 */
  ivy: "1234123412341234"
};
/** */
export default class Crypto {
  /** */
  options: Options;
  /** */
  constructor(
    options: Partial<Options> & { password: string } = defaultOptions
  ) {
    this.options = Object.assign(defaultOptions, options);
    if (
      !isString(this.options.password) ||
      this.options.password.trim() === ""
    ) {
      throw new Error("invalid password/passphrase (required)");
    }
    if (this.options.password.length < 16) {
      throw new Error("invalid password/passphrase length (required:>=16)");
    }
    if (!isString(this.options.ivy) || this.options.ivy.trim() === "") {
      throw new Error("invalid ivy (required)");
    }
  }
  /** */
  encrypt = (text: string) => {
    const { algorithm, password, ivy } = this.options;
    var cipher = crypto.createCipheriv(algorithm, password, ivy);
    var crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
  };
  /** */
  decrypt = (text: string) => {
    const { algorithm, password, ivy } = this.options;
    var decipher = crypto.createDecipheriv(algorithm, password, ivy);
    var dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
  };
}
