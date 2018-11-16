import verify from "./verify";
import { RequestHandler } from "express";
import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);
// ...
export default function validateHandler(
  validateExtra: (stuff: { token: string, token_id: string, verified: { [key: string]: any } }) => Promise<boolean>,
): RequestHandler {
  return async (req, res, next) => {
    try {
      const { headers } = req;
      const token: string = ((headers["License"] ||
        headers["license"] ||
        "") as string).split(/Lic\s/)[1];
      const verified = verify(token);
      if (!verified) {
        return res.status(400).send("Invalid Token: v");
      }
      const { token_id, ...stuff } = verified;
      if (!stuff) {
        debug("No Stuf");
        return res.status(400).send("Invalid Token: nc");
      }
      if (!token_id) {
        debug("No token_id");
        return res.status(400).send("Invalid Token: nid");
      }
      if (!(await validateExtra({ token, token_id, verified }))) {
        debug("Invalid extra");
        return res.status(400).send("Invalid Token: ne");
      }
      // find rules and compar origin, ips ?
      return res.send("ok");
    } catch (error) {
      return next(error);
    }
  };
}
