import Auth from "@australis/tiny-auth";
import { Router, json } from "express";
import users from "./users";
import blackList from "./blacklist";

const auth = Auth(
    process.env.TINY_AUTH_SECRET,
    "localhost",
    "*",
    60 * 60,
    users,
    blackList
);

const { authorize, requireRole, changePassword, getProfile, login, refresh, tokenBlackList } = auth;

/**
 * Middleware 
 */
export {
    authorize, requireRole, tokenBlackList
}
/**
 * Auth handlers
 */
export default () => {
    const router = Router();
    router.use(json());
    /** Configure Auth */
    router.post("/login", login);
    router.get("/refresh", authorize, refresh)
    router.get("/profile", authorize, getProfile);
    router.post("/change-password", authorize, requireRole(['user']), changePassword);
    return router;
}