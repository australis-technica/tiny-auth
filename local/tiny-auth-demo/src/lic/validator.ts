/** 
 * TODO: move up ../
 */
import { repo as customers } from "../crud-customers";
import { repo as licenses } from "../crud-licenses";
import { repo as products } from "../crud-products";
import { Validator } from "./types";
import { debugModule } from "@australis/create-debug";
import datesAreEqual from "./dates_are_equal";
const debug = debugModule(module);
/** 
 * TODO: move up ../
 */
const validator: Validator = async ({ token, token_id, verified }) => {
    const resolve = Promise.resolve.bind(Promise);
    if (!token_id || !verified) return resolve(false);
    const l = await licenses.byId(token_id);
    if (!l) {
        debug("Not Found");
        return resolve(false);
    }
    // ...
    if (!l.enabled) {
        debug("License Disabled");
        return resolve(false);
    }
    if (l.token !== token) {
        debug("Wrong token");
        return resolve(false);
    }
    const exp = l.exp;
    if (!datesAreEqual(exp, verified.exp_date)) {
        debug("Wrong Exp. date.");
        return resolve(false);
    }
    const c = await customers.byId(l.customer);
    if (!c) {
        debug("Bad customer");
        return resolve(false);
    }
    if (!c.enabled) {
        debug("Customer Disabled");
        return resolve(false);
    }
    const p = await products.byId(l.product);
    if (!p) {
        debug("Bad product");
        return resolve(false);
    }
    if (!p.enabled) {
        debug("Product Disabled");
        return resolve(false);
    }
    // extract same stored props, if same props added , should match 
    const keys = Object.keys(l);
    const matchingKeys = Object.keys(verified)
        .filter(key => keys.indexOf(key) !== -1);
    for (const key of matchingKeys) {
        let expected = (l as any)[key];
        let value = verified[key];
        if (key === "exp") {
            // will never match
            continue;
        }
        if (expected !== value) {
            debug("included Key/value: %s/%s dopesn't match %s", key, value, expected);
            return resolve(false);
        }
    }
    return resolve(true);
}
export default validator;