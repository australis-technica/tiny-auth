import { RequestHandler, Request, Response } from "express-serve-static-core";
import { Table } from "./types";
import fromBody from "./from-body";
/** */
export default function CrudController<TTable extends Table>(table: TTable) {
  // 
  const noClean = (x: any) => x;
  /**
   *
   */
  const get: (clean?: (x: any) => any) => RequestHandler = (clean = noClean) => async (req, res, next) => {
    try {
      const { id } = req.params;
      let data: any = null;
      if (id) {
        data = await table.byId(id);
      } else {
        data = await table.all();
      }
      return res.json(clean(data));
    } catch (error) {
      return next(error);
    }
  };
  /**
   *
   */
  const dlete: (clean?: (x: any) => any) => RequestHandler = (clean = noClean) => async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await table.remove(id);
      return res.json(clean(data));
    } catch (error) {
      return next(error);
    }
  };
  /**
   *
   */
  const put: (payload?: (req: Request, res: Response) => any, clean?: (x: any) => any) => RequestHandler = (payload = fromBody, clean = noClean) => async (req, res, next) => {
    try {
      const data = await table.add(payload(req, res));
      return res.json(clean(data));
    } catch (error) {
      return next(error);
    }
  };
  /**
   *
   */
  const post: (payload?: (req: Request, res: Response) => any, clean?: (x: any) => any) => RequestHandler = (payload = fromBody, clean = noClean) => async (req, res, next) => {
    try {
      const data = await table.update(payload(req, res));
      return res.json(clean(data));
    } catch (error) {
      return next(error);
    }
  };
  return {
    put,
    get,
    dlete,
    post
  };
}
