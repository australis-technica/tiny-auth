export declare type User = {
    id?: string;
    displayName?: string;
    email?: string;
    roles?: string;
    password?: string;
    disabled?: boolean;
};
export type FindUser = (id: string) => Promise<User>;
export type UpdateUser = (u: User) => Promise<any>;
export interface RequestLike {
    headers?: { [key: string]: any }
}
export type PasswordChanger = (user: string, oldPassword: string, newPassword: string) => Promise<User | undefined>;
export type ValidateCredentials = (id: string, password: string) => Promise<User | undefined>
export type Users = {
    findOne: (id: any) => Promise<User>,
    validateCredentials: ValidateCredentials,
    changePassword: PasswordChanger
}
export type Blacklist = {
    findOne: (id: string) => Promise<boolean>,
    add: (id: string) => Promise<any>
}
export type GetToken = (request: {}) => Promise<string>;
