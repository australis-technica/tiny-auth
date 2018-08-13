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
export default function datesAreEqual(a: Date | string | number, b: Date | string | number) {
    if (!a || !b) return a === b;
    const date1 = convert(a);
    const date2 = convert(b);
    return date1 === date2;
}