import { RequestHandler } from "express-serve-static-core";
import { TokenBlackList, GetToken } from "@australis/tiny-auth-core";
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