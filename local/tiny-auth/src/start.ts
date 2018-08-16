import { Express } from "express-serve-static-core";
import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);
/** START */
const start = (app: Express, port: number) => new Promise((resolve, reject) => {    
    if (!port) {
        return reject("NO PORT specified");
    }
    app.listen(port, ((error: any) => {
        if (error) {
            return reject(error);
        }
        debug(`listening on PORT=${port}`);
        debug(`pid=${process.pid}`);
        return resolve();
    }))
})
export default start;