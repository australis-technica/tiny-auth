import { RequestHandler } from "express-serve-static-core";
import bodyParser from "body-parser";
import { ValidateCredentials } from "@australis/tiny-auth-core";
import os from "os";
/** */
function isString(x: any): x is string {
  return typeof x === "string";
}
/** HANDLER */
const login: (
  validateCredentials: ValidateCredentials,
  sign: (extra?: {}) => Promise<{}>
) => RequestHandler[] = (validate, sign) => [
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
      const iss = process.env.AUTH_ISSUER || os.hostname();
      const ips = (req.ips||[]).concat([req.ip]).join(",");
      const ua  = req.headers["user-agent"];
      return res.json(await sign({ profile, iss, ips, ua }));
    } catch (error) {
      return next(error);
    }
  }
];
export default login;
