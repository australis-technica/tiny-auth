import { RequestHandler } from "express";
import createHash from "./fingerprint";
import { Users } from "./types";
/** */
function isString(x: any): x is string {
  return typeof x === "string";
}
/** HANDLER */
const login = (users: Users, sign: (x: {}) => any): RequestHandler =>
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      if (!isString(username)) {
        return res.status(400).send("username required");
      }
      const profile = await users.validateCredentials(username, password);
      if (!profile) {
        return next(Object.assign(new Error("Unauthorized"), { code: 401 }));
      }
      const fingerprint = createHash(req);
      return res.json(sign({ profile, fingerprint }));
    } catch (error) {
      return next(error);
    }
  }
  ;
export default login;
