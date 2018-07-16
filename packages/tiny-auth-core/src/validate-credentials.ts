import { User } from "./user";

export type ValidateCredentials = (id: string, password: string)=> Promise<User>;