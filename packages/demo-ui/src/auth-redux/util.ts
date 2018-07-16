/** */
export function setPartial<T extends {}>(s: T, p: Partial<T>): T {
    return Object.assign({}, s, p);
}
/** */
export function isError(x: any): x is Error {
    return !!(x && x.message);
}