import Auth from "@australis/tiny-auth";
import fingerPrint from "@australis/tiny-auth/lib/fingerPrint";
import { Router } from "express";
import users from "./users";

const { findUser, updateUser } = users;
const blackList: any[] = [];
const isBlackListed = (token: string) => Promise.resolve(blackList.indexOf(token) !== -1);
const addToBlackList = (token: string) => Promise.resolve(blackList.push(token));

const auth = Auth(
    process.env.TINY_AUTH_SECRET,
    findUser,
    updateUser,
    isBlackListed,
    addToBlackList
);
const { middleware, controllers } = auth;
export {
    middleware,
    controllers,
}

export default () => {
    const router = Router();
    const auth = Auth(process.env.TINY_AUTH_SECRET, findUser, updateUser, isBlackListed, addToBlackList);
    router.use(fingerPrint);
    const { authorize, requireRole } = auth.middleware;
    /** Configure Auth */
    router.post("/login", auth.controllers.login);
    router.get("/refresh", authorize, auth.controllers.refresh)
    router.get("/profile", authorize, auth.controllers.getProfile);
    router.post("/change-password", authorize, requireRole(['user']), auth.controllers.changePassword);
    return router;
}