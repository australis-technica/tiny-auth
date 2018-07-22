export default function getFields<T extends {}>(
  item: T,
  ...exclude: (keyof T)[]
): string {
  exclude = exclude || [];
  const keys = Object.keys(item).filter(
    key => exclude.indexOf(key as keyof T) === -1
  );
  let fields = keys.map(key => `${key} = @${key}`).join(",");
  return fields;
}
