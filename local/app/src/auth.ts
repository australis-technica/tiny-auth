import Auth from "@australis/tiny-auth";
import { Router, json } from "express";

export type User = {
    id?: string;
    displayName?: string;
    email?: string;
    roles?: string;
    password?: string;
    disabled?: boolean;
};

const users: User[] = [
    // ...
];

const findUser = (id: string) => {
    return Promise.resolve(users.find(u => u.id === id))
}

const updateUser = (_u: any) => {
    return Promise.resolve();
}

const blackList: any[] = [];
const isBlackListed = (token: string) => Promise.resolve(blackList.indexOf(token) !== -1);
const addToBlackList = (token: string) => Promise.resolve(blackList.push(token));

const auth = Auth(
    process.env.TINY_AUTH_SECRET,
    "localhost",
    "*",
    60 * 60,
    findUser,
    updateUser,
    isBlackListed,
    addToBlackList,
);

const { authorize, requireRole, changePassword, crypto, getProfile, login, refresh, tokenBlackList } = auth;

users.push({ id: "admin", password: crypto.encrypt("password"), roles: ["admin"].join(",") })

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