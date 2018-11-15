/** 
 * TODO: move up ../
 */

import { debugModule } from "@australis/create-debug";
import customers from "@australis/tiny-auth-customers";
import licenses from "@australis/tiny-auth-licenses";
import products from "@australis/tiny-auth-products";

/** TODO: */
function convert(x: string | Date | number): number {
    const type = typeof x;
    switch (type) {
        case "string": {
            return new Date(x).getTime();
        }
        case "number": {
            return new Date(x).getTime();
        }
        default: {
            return (x as Date).getTime();
        }
    }
}
/**
 * 
 * @param a a Date
 * @param b a Date
 */
function datesAreEqual(a: Date | string | number, b: Date | string | number) {
    if (!a || !b) return a === b;
    const date1 = convert(a);
    const date2 = convert(b);
    return date1 === date2;
}

export type Validator = (args: { token: string, token_id: string, verified: { [key: string]: any } }) => Promise<boolean>;

const debug = debugModule(module);

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
            debug("included Key/value: %s/%s doesn't match %s", key, value, expected);
            return resolve(false);
        }
    }
    return resolve(true);
}
export default validator;