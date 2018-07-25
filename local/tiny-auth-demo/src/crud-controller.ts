import { RequestHandler, Request } from "express-serve-static-core";
import bodyParser from "body-parser";
import uuid from "uuid";
/** */
export interface Table {
  byId(args: any): Promise<any>;
  all(args?: any): Promise<any>;
  remove(args?: any): Promise<any>;
  add(args: any): Promise<any>;
  update(args: any): Promise<any>;
}
export interface Options {
  autogenID?: boolean;
}
const defaultOptions: Options = {

}
/** */
export default function CrudController<TTable extends Table>(table: TTable, options: Partial<Options> = defaultOptions) {
  // merge options
  options = Object.assign({}, defaultOptions, options || {});
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
   * gets non optional id from param or body or new_id
   */
  function ensureNewId(req: Request) {
    let { id, ...body } = req.body;
    id = Number(req.params.id);
    id = id || Number(id);
    if (!!options.autogenID) {
      id = id || uuid();
    }
    return {
      id,
      body
    }
  }
  /**
   *
   */
  const put: RequestHandler = async (req, res, next) => {
    try {
      const { id, body } = ensureNewId(req);
      const data = await table.add({ id, ...body });
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
    put: [bodyParser.json(), put],
    get,
    dlete,
    post: [bodyParser.json(), post]
  };
}
