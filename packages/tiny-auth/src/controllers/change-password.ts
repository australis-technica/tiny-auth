import { RequestHandler , json} from "express";
/**
 *   POST
 */
const changePassword: (passwordChanger: (user: string, oldPassword: string, newPassword: string) => any) => RequestHandler[] = (changePassword) => [
  json(),
  async (req, res, next) => {
    try {
      const username = (req as any).user && (req as any).user.id;
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
