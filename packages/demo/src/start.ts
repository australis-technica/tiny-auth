import Debug from "./debug";
import { Express } from "express-serve-static-core";
const debug = Debug(__filename);
/** START */
const start = (app: Express) => new Promise((resolve, reject) => {
    const port = Number(process.env.PORT)
    if (!port) {
        return reject("NO PORT specified");           
    }
    app.listen(port, ((error: any) => {
        if (error) {
            return reject(error);
        }
        debug(`listening on PORT=${process.env.PORT}`);
        debug(`pid=${process.pid}`);  
        return resolve();
    }))
})
export default start;