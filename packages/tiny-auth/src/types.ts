export declare type User = {
    id?: string;
    displayName?: string;
    email?: string;
    roles?: string;
    password?: string;
    disabled?: boolean;
};

export type FindUser = (id: string)=> Promise<User>;

export type UpdateUser = (u: User)=> Promise<any>;