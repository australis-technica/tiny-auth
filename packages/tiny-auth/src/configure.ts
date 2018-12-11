import { debugModule } from "@australis/create-debug";
import fingerPrint from "./fingerprint";
import { Router } from "express";
const debug = debugModule(module);
import Auth from "./auth";
import { FindUser, UpdateUser } from "./types";

export default (
    secret: string,
    findUser: FindUser,
    updateUser: UpdateUser,
    isBlackListed: (token: string) => Promise<boolean>,
    addToBlackList: (toke: string) => Promise<any>,
) => () => {
    const router = Router();
    const auth = Auth(secret, findUser, updateUser, isBlackListed, addToBlackList);
    try {
        router.use(fingerPrint);
        const { authorize, requireRole } = auth.middleware;
        /** Configure Auth */
        router.post("/login", auth.controllers.login);
        router.get("/refresh", authorize, auth.controllers.refresh)
        router.get("/profile", authorize, auth.controllers.getProfile);
        router.post("/change-password", authorize, requireRole(['user']), auth.controllers.changePassword);
        debug("configured");
    } catch (error) {
        debug(error);
        throw error;
    }
}