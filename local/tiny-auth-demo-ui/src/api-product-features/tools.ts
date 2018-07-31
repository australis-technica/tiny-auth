function toList(s: string) {
    return s
        .split(",")
        .filter(x => x.trim() !== "");
}
/**
 * @description returns { key: key }  from comma separated list of string
 */
function toObject(s: string, getValue?: (out: {}, key: string) => string): {} {
    const read = ((out: {}, key: string): string => (out && key && out[key]) || "");
    if (!s) return {};
    const o = toList(s)
        .reduce((out, next) => {
            out[next] = getValue ? getValue(out, next) : read(out, next);
            return out;
        }, {});
    return o;
}

function toString(o: {}): string {
    return Object.keys(o)
        .map(key => o[key].toString())
        .join(",");
}

function setFeature(state: { features: string }, payload: {}) {
    const { features } = state;
    return Object.assign({}, toObject(features), payload);
}

function keys(features: string) {
    return Object.keys(toObject(features))
}

export default {
    toList,
    toObject,
    toString,
    setFeature,
    keys
}