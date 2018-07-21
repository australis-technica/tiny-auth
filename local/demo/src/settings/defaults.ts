import table from "./table";
import { Connection } from "tedious";
/** */
const defaults = (con: Connection) =>
  table.defaults(con, {
    // app default/initial values
    appName: JSON.stringify("tiny-auth-demo")
  });
export default defaults;
