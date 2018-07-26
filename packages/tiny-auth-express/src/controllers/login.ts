import { ValidateCredentials } from "@australis/tiny-auth-core";
import { fingerPrint } from "@australis/tiny-auth-express-fingerprint";
import { signToken } from "@australis/tiny-auth-token-sign";
import bodyParser from "body-parser";
import { RequestHandler } from "express-serve-static-core";
/** */
function isString(x: any): x is string {
  return typeof x === "string";
}
/** HANDLER */
const login: (
  validateCredentials: ValidateCredentials
) => RequestHandler[] = validate => [
  bodyParser.json(),
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
