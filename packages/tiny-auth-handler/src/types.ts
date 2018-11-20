export type User = {
    id?: string;
    displayName?: string;
    email?: string;
    roles?: string;
    password?: string;
    disabled?: boolean;
};
/** */
export interface AuthApi {
    login(username: string, password: string): Promise<any>;
    profile(): Promise<any>;
    refresh(): Promise<any>
    logout(): Promise<any>;
    changePassword(password: string, newPassword: string): Promise<any>;
}
/** */
export type AuthState = {
    profile: User;
    token: string;
    error?: string;
    busy?: boolean;
    authenticated: boolean;
    passwordChanged: boolean;
    passwordChanging: boolean;
};