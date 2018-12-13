import { debugModule } from "@australis/create-debug";
import { RequestHandler } from "express";
import { Users } from "./types";
import { withoutPassword } from "./util";
const debug = debugModule(module);
/**
 *
 */
const getProfile = (users: Users ): RequestHandler => async (req, res, next) => {
  try {
    const id = (req as any).user && (req as any).user.id;
    const result = await users.findOne(id).then(withoutPassword);
    return res.status(200).json({ profile: result, token: res.locals.token });
  } catch (error) {
    debug(error);
    return next(Object.assign(new Error("bad request!"), { code: 401 }));
  }
};
export default getProfile;
