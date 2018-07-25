import { RequestHandler } from "express-serve-static-core";
import { Table } from "./types";
/** */
export default function CrudController<TTable extends Table>(table: TTable) {
  // merge options

  /**
   *
   */
  const get: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      let data: any = null;
      if (id) {
        data = await table.byId(id);
      } else {
        data = await table.all();
      }
      return res.json(data);
    } catch (error) {
      return next(error);
    }
  };
  /**
   *
   */
  const dlete: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await table.remove(id);
      return res.json(data);
    } catch (error) {
      return next(error);
    }
  };
  /**
   *
   */
  const put: RequestHandler = async (req, res, next) => {
    try {      
      const data = await table.add(req.body);
      return res.json(data);
    } catch (error) {
      return next(error);
    }
  };
  /**
   *
   */
  const post: RequestHandler = async (req, res, next) => {
    try {
      const data = await table.update(req.body);
      return res.json(data);
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
