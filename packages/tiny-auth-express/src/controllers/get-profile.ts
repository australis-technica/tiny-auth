import { Users } from "@australis/tiny-auth-core";
import { RequestHandler } from "express";
// TODO:
import { debugModule } from "@australis/create-debug";
import { withoutPassword } from "./util";
const debug = debugModule(module);
/**
 * 
 */
const getProfile: (users: Users) => RequestHandler = (users) => async (req, res, next) => {
  try {
    const result = await users.byId(req.user.id).then(withoutPassword);
    return res.status(200).json({ profile: result, token: res.locals.token });
  } catch (error) {
    debug(error);
    return next(Object.assign(new Error("bad request!"), { code: 401 }));
  }
};
export default getProfile;