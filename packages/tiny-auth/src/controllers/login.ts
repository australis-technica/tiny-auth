import { fingerPrint } from "../fingerprint";
import { signToken } from "../token-sign";
import { RequestHandler, json } from "express";
/** */
function isString(x: any): x is string {
  return typeof x === "string";
}
export type ValidateCredentials = (id: string, password: string) => Promise<any>;
/** HANDLER */
const login: (
  validateCredentials: ValidateCredentials
) => RequestHandler[] = validate => [
  json(),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      if (!isString(username)) {
        return res.status(400).send("username required");
      }
      const profile = await validate(username, password);
      if (!profile) {
        return next(Object.assign(new Error("Unauthorized"), { code: 401 }));
      }
      const fingerprint = fingerPrint(res);
      return res.json(await signToken({ profile, fingerprint }));
    } catch (error) {
      return next(error);
    }
  }
];
export default login;
