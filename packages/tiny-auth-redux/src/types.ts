export type User = {
    id?: string;
    displayName?: string;
    email?: string;
    roles?: string;
    password?: string;
    disabled?: boolean;
};
/** client side */
export declare type AuthState = {
    profile: User;
    token: string;
    error?: string;
    busy?: boolean;
    authenticated: boolean;
    passwordChanged: boolean;
    passwordChanging: boolean;
};
