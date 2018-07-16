import {User} from "./user";

/**
 * TODO: find/find-by, add ? 
 */
export interface Users {
    byId(id: string): Promise<User>;

    all(): Promise<User[]>;

    changePassword(id: string, password: string, newPassword: string): Promise<User>;

    update(user: User): Promise<User>;
}