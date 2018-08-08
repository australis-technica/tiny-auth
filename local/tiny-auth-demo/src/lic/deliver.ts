import { renderTemplate, sendMail } from "@australis/send-grid-mail";
import { User } from "@australis/tiny-auth-core";
import { json } from "body-parser";
import { RequestHandler } from "express-serve-static-core";
// TODO: decouple
import { License, repo as licenses } from "../crud-licenses";
import users from "../users";
import verify from "./verify";
/** */
function send(data: { license: License, user: User }) {
  const { user, license } = data;
  const subject = renderTemplate("deliver-subject", { license, user });
  const html = renderTemplate("deliver", { license, user });
  const mailData = {
    to: user.email,
    subject,
    html
  };
  return sendMail(mailData);
}
/** */
export default function Deliver() {
  /** */
  const deliver: RequestHandler = async (req, res, next) => {
    try {
      const { body } = req as { body: { id?: string } };

      if (!body) {
        return next(new Error("json body required"));
      }
      const { id } = body;
      if (typeof id !== "string") {
        return next(new Error("id required"));
      }
      const user = await users.byId(req.user.id);
      if (!user) {
        return next(new Error("user not found"));
      }
      const { email } = user;
      if ((user && !email) || !email.trim()) {
        return next(new Error("destination not found"));
      }
      const license = await licenses.byId(id);
      if (!license) {
        return next(new Error("No such license"));
      }
      const verified = verify(license.token);
      if (!verified) {
        return next(new Error("verification failed"));
      }      // do  not stop becasue there isn't template          
      const x = await send({ license, user });
      if (x instanceof Error) {
        return next(x);
      }
      return res.json("ok");
    } catch (error) {
      return next(error);
    }
  };
  return [json(), deliver];
}
