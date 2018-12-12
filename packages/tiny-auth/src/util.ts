type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export function withoutPassword<T extends any & { password: string }>(x: T): Omit<T, "password"> {
    const { password, ...rest } = (x as any);
    return rest
}