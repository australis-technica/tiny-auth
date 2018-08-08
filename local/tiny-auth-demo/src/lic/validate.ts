import verify from "./verify";
import { RequestHandler } from "express-serve-static-core";
import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);
// ...
export default function(findById: (id: string) => Promise<{}>): RequestHandler {
  return async (req, res, next) => {
    try {
      const { headers } = req;
      const token: string = ((headers["License"] ||
        headers["license"] ||
        "") as string).split(/Lic\s/)[1];
      const { token_id, ...stuff } = verify(token);
      if (!stuff) {
        debug("No Stuf");
        return res.status(400).send("Invalid Token");
      }
      const lic = token_id && (await findById(token_id));
      if (!lic) {
        debug("No token_id");
        return res.status(400).send("Invalid Token");
      }
      // find rules and compar origin, ips ?
      return res.send("ok");
    } catch (error) {
      return next(error);
    }
  };
}
