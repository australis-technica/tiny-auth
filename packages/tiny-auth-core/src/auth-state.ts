import {User} from "./user";
/** client side */
export type AuthState = {
    profile: User;
    token: string;
    error?: string;
    busy?: boolean;
    authenticated: boolean;
};