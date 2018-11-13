import { json } from "body-parser";
import { RequestHandler } from "express";
import deliverByMail, { validateReceipient } from "./deliver-by-mail";
/** */
export default function Deliver(
  findById: (id: string) => Promise<{}>
) {
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
      const { user } = req;
      if (!user) {
        return next(new Error("user not found"));
      }
      const { email } = user;
      if (!email || !email.trim() || !validateReceipient(email)) {
        return next(new Error("destination not found"));
      }
      const data = await findById(id);
      if (!data) {
        return next(new Error("No data to deliver"));
      }
      // do not stop becasue there isn't template
      const x = await deliverByMail("deliver", email, { ...data, user });
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
