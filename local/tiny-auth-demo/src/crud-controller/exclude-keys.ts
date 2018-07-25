/**
 *
 * @param data
 * @param keys
 */
export default function excludeKeys<T extends { [key: string]: any }, TK extends keyof T & string>(  
  ...keys: TK[]
) {
  return (data: T): Partial<T> => Object.keys(data)
    .filter(key => !(key in keys))
    .reduce((out, next) => {
        out[next] = data[next];
        return out;
    }, {} as Partial<T>);
}
