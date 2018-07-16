import { User } from "./user";

export type PasswordChanger = (id: string, password: string, newPassword: string )=> Promise<User>;