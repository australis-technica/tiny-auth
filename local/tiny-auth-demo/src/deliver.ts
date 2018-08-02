import { json } from "body-parser";
import { RequestHandler } from "express-serve-static-core";
import { repo } from "./crud-licenses";
import verify from "./lic/verify";
/** */
export default function() {
  /** */
  const deliver: RequestHandler = async (req, res, next) => {
    try {
      const { body } = req as { body: { id?: string } };
      const validation: string[] = [];
      if (!body) {
        validation.push("json body required");
      }
      const { id } = body;
      if (typeof id !== "string") {
        validation.push("id required");
      }
      const { user } = req;
      if (!user) {
        validation.push("user not found");
      }
      const { email } = user;
      if ((user && !email) || !email.trim()) {
        validation.push("destination not found");
      }
      const license = await repo.byId(id);
      if (!license) {
        validation.push("No such license");
      }
      const verified = verify(license.token);
      if (!verified) {
        validation.push("verification failed");
      }
      if (validation && validation.length) {
        return next(new Error(`Can't deliver: ${validation.join(",")}`));
      }
      return res.json("ok");
    } catch (error) {
      return next(error);
    }
  };  
  return [ json(), deliver];
}
