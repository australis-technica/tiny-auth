import withSqlConnection from "@australis/tiny-sql-with-sql-connection";
import { connectionFactory as connect } from "@australis/tiny-sql";
import table from "./table";
import { Customer } from "./types";/**
 * 
 */
export default {
  add: (p: Partial<Customer> & { id: string; displayName: string }) =>
    withSqlConnection(connect, c => table.add(c, p)),
  all: () => withSqlConnection(connect, table.all),
  byId: (id: string) => withSqlConnection(connect, c => table.byId(c, id)),
  findBy: (args: Partial<Customer>)=> withSqlConnection(connect, c=> table.findBy(c, args)),
  // init,
  remove: (id: string)=> withSqlConnection(connect, c=> table.remove(c, id)),
  update: (p: Partial<Customer> & { id: string})=> withSqlConnection(connect, c=> table.update(c, p)),
  // table
};
