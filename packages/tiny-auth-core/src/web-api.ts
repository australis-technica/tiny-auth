/** client side */
export type WebApi = {
    login: (...args: any[]) => Promise<any>;
    logout: (...args: any[]) => Promise<any>;
    profile: (...args: any[]) => Promise<any>;
    refresh: (...args: any[]) => Promise<any>
}