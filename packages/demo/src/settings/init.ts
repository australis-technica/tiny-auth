import table from "./table";
import { Connection } from "tedious";
/** */
export const init = table.init;
/** */
export const defaults = (con: Connection) =>
  table.defaults(con, {
    // app default/initial values
    appName: JSON.stringify("tiny-auth-demo")
  });
