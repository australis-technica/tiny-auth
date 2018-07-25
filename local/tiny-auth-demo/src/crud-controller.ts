import { RequestHandler } from "express-serve-static-core";
/** */
export interface Table {
  byId(...args: any[]): Promise<any>;
  all(...args: any[]): Promise<any>;
  remove(...args: any[]): Promise<any>;
  add(...args: any[]): Promise<any>;
  update(...args: any[]): Promise<any>;  
}
/** */
export default function CrudController<TTable extends Table>(table: TTable) {
  /**
   *
   */
  const get: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      let data: any = null;
      if (id) {
        await table.byId(id);
      } else {
        await table.all();
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
      const { id } = req.params;
      const data = await table.add({ id, ...req.body });
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
