import { Express, RequestHandler } from "express-serve-static-core";
import {
    CrudController,
    ensureID,
    ensureBody,
} from "@australis/tiny-crud-controller";
import repo from "./repo";
import auth from "../auth";
import uuid from "uuid";
import { json } from "body-parser";
/**
 *
 * @param app
 */
export default function configureCrud(app: Express) {
    const { authorize, requireRole } = auth.middleware;
    {
        const crud = CrudController(repo);
        const endpoint = "products";
        const route = `/api/${endpoint}/:id?`;
        app.get(route, [authorize, requireRole(["admin"]), crud.get()]);
        app.put(route, [
            authorize,
            requireRole(["admin"]),
            json(),
            ensureBody(),
            ensureID(uuid),
            ((req, _res, next) => {
                // include user
                try {
                    req.body.userid = req.user.id
                    return next();
                } catch (error) {
                    return next(error);
                }
            }) as RequestHandler,
            crud.put()
        ]);
        app.post(route, [
            authorize,
            requireRole(["admin"]),
            json(),
            ensureBody(),
            ensureID(), // reject missing id
            crud.post()
        ]);
        app.delete(route, [
            authorize,
            json(),
            ensureBody(),
            ensureID(), // reject no id
            requireRole(["admin", "delete"]),
            crud.dlete()
        ]);
    }
}