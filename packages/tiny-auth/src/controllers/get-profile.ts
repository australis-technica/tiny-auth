import { RequestHandler } from "express";
// TODO:
import { debugModule } from "@australis/create-debug";
import { withoutPassword } from "./util";
const debug = debugModule(module);
/**
 *
 */
const getProfile: (
  findById: (id: string) => Promise<any>,
) => RequestHandler = findById => async (req, res, next) => {
  try {
    const result = await findById(
      (req as any).user && (req as any).user.id,
    ).then(withoutPassword);
    return res.status(200).json({ profile: result, token: res.locals.token });
  } catch (error) {
    debug(error);
    return next(Object.assign(new Error("bad request!"), { code: 401 }));
  }
};
export default getProfile;
