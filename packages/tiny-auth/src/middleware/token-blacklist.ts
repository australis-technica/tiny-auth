import { RequestHandler } from "express";
export type GetToken = (req: {})=> Promise<string>;
export interface TokenBlackList {
    isBlackListed(token: string): Promise<boolean>;
    add(token: string):Promise<any>;
}
/**
 * TODO
 */
export default function (blacklist: TokenBlackList, getToken: GetToken ): RequestHandler      {
    return  async (req, _res, next)=>{
    try {
        if(blacklist.isBlackListed(await getToken(req))){
            next(new Error("Token Blacklisted"));
        }
        next();
    }catch (error) {
        return next(error);
    }
}}