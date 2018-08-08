/** 
 * TODO: move up ../
 */
import { repo as customers } from "../crud-customers";
import { repo as licenses } from "../crud-licenses";
import { repo as products } from "../crud-products";
import { Validator } from "./types";
import { debugModule } from "@australis/create-debug";
const debug = debugModule(module);
/** 
 * TODO: move up ../
 */
const validator: Validator = async ({ token, token_id, verified }) => {
    const resolve = Promise.resolve.bind(Promise);
    if (!token_id || !verified) return resolve(false);
    const found = await licenses.byId(token_id);
    if (!found) {
        debug("Not Found");
        return resolve(false);
    }
    // ...
    if (!found.enabled) {
        debug("License Disabled");
        return resolve(false);
    }
    if (found.token !== token) {
        debug("Wrong token");
        return resolve(false);
    }
    const c = await customers.byId(found.customer);
    if (!c) {
        debug("Bad customer");
        return resolve(false);
    }
    if (!c.enabled) {
        debug("Customer Disabled");
        return resolve(false);
    }
    const p = await products.byId(found.product);
    if (!p) {
        debug("Bad product");
        return resolve(false);
    }
    if (!p.enabled) {
        debug("Product Disabled");
        return resolve(false);
    }
    // extract same stored props, if same props added , should match 
    const keys = Object.keys(found);
    const matchingKeys = Object.keys(verified)
        .filter(key => keys.indexOf(key) !== -1);
    for (const key of matchingKeys) {
        let expected = (found as any)[key];
        let value = verified[key]
        if (key === "exp") {
            // string/number to Date in seconds
            const date = new Date(expected);
            console.log(date);
            console.log(new Date(value));
            expected = Math.floor(date.valueOf() / 1000);
        }
        if (expected !== value) {
            debug("included Key/value: %s/%s dopesn't match %s", key, value, expected);
            return resolve(false);
        }
    }
    return resolve(true);
}
export default validator;