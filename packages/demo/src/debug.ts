import Debug from "debug";
import pkg from "./pkg";
import { extname, basename } from "path";
export default (xName: string) => {
    const debug = Debug(`${pkg.name.replace("@", "")}:${basename(xName.replace(extname(xName), ""))}`);
    if (process.env.DEBUG_TO === "stdout") { debug.log = console.log.bind(console); }
    return debug;
}