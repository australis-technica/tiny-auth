/** */
export interface AuthApi {
    login(username: string, password: string): Promise<any>;
    profile(): Promise<any>;
    refresh(): Promise<any>
    logout(): Promise<any>;
    changePassword(password: string, newPassword: string): Promise<any>;
}