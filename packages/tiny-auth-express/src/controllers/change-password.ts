import { RequestHandler } from "express";
import bodyParser from "body-parser";
import { PasswordChanger } from "@australis/tiny-auth-core";
/**
 *   POST
 */
const changePassword: (passwordChanger: PasswordChanger) => RequestHandler[] = (changePassword) => [
  bodyParser.json(),
  async (req, res, next) => {
    try {
      const username = req.user.id;
      const { password, newPassword } = req.body as {        
        password: string;
        newPassword: string;
      };
      const x = await changePassword(
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
];
/** */
export default changePassword;
