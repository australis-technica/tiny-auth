import Debug from "debug";
import { basename, extname, join } from "path";
/** */
const { name }  = require(join(__dirname, "../package.json"));
/** */
export default function createAppDebug(xName: string) {
    const debug = Debug(`${name.replace("@", "")}:${basename(xName.replace(extname(xName), ""))}`);
    if (process.env.DEBUG_TO === "stdout") { 
        debug.log = console.log.bind(console);         
    }
    return debug;
}