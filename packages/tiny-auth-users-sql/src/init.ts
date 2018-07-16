import { readFileSync } from "fs";
import { join } from "path";
import { execSql as ExecSql} from "@australis/tiny-sql";
import { Connection } from "tedious";
import { debugModule } from "@australis/create-debug";
/** */
const debug = debugModule(module);

/** */
export default async function init(connection: Connection){        
    try {
        const parts = readFileSync(join(__dirname, "../sql/init.sql"), 'utf-8').split(/GO/i);    
    for(const s of parts){
        await ExecSql(connection)(s);
    }
    const { values } = await ExecSql(connection)<{ok: number}>("select ok=1 from sys.tables where name = 'users'")    
    return values[0]["ok"] === 1;
    } catch(error){
        debug(error);
        throw error;
    }
}