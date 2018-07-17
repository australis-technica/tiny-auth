import get from "./get";
import init from "./init";
import defaults from "./defaults";
import add from "./add" ;
import set from "./set";
import keyExists from "./key-exists";
/** */
export default (tableName: string)=> ({
    get: get(tableName),
    init: init(tableName),
    defaults: defaults(tableName),
    add: add(tableName),
    set: set(tableName),
    keyExists: keyExists(tableName)
});