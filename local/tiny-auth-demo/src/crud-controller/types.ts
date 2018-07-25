import { Request } from "express-serve-static-core";
/** */
export interface Table {
    byId(args: any): Promise<any>;
    all(args?: any): Promise<any>;
    remove(args?: any): Promise<any>;
    add(args: any): Promise<any>;
    update(args: any): Promise<any>;
}
/** */
export type Validate = (req: Request) => Promise<string[]>;
/** */
export interface Options {

    validate?: Validate;
}