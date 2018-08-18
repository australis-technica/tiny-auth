import withSqlConnection from "@australis/tiny-sql-with-sql-connection";
import connect from "@australis/tiny-sql-connection-factory";
import table from "./table";
import { Product } from "./types";/**
 * 
 */
export default {
  add: (p: Partial<Product> & { id: string; displayName: string }) =>
    withSqlConnection(connect, c => table.add(c, p)),
  all: () => withSqlConnection(connect, table.all),
  byId: (id: string) => withSqlConnection(connect, c => table.byId(c, id)),
  findBy: (args: Partial<Product>)=> withSqlConnection(connect, c=> table.findBy(c, args)),
  // init,
  remove: (id: string)=> withSqlConnection(connect, c=> table.remove(c, id)),
  update: (p: Partial<Product> & { id: string})=> withSqlConnection(connect, c=> table.update(c, p)),
  // table
};
