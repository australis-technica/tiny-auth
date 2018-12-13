import { RequestHandler } from "express";
import { Users } from "./types";
/**
 *   POST
 */
const changePassword = (users: Users): RequestHandler =>
  async (req, res, next) => {
    try {
      const username = (req as any).user && (req as any).user.id;
      const { password, newPassword } = req.body as {
        password: string;
        newPassword: string;
      };
      const x = await users.changePassword(
        username,
        password,
        newPassword
      );
      if (!x) next(new Error("password change failed"));
      res.json("ok");
    } catch (error) {
      return next(error);
    }
  }
/** */
export default changePassword;
