import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);
/**
 * 
 */
export default async (): Promise<string[]> => {
    // ...      
    let { features } = require("minimist")(process.argv.slice(2));
    features = (
        (typeof features === "string" && features) ||
        process.env.APP_FEATURES ||
        ""
    )
        .replace(/\[(.*)\]/, (_, $1) => { return $1; })
        .split(",");

    if (!features.length) {
        return Promise.reject("env.APP_FEATURES || args.features is Required!")
    }
    debug("features: ", features);
    return features;
}
