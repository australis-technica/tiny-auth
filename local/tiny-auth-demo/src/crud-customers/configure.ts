import { Express, RequestHandler } from "express-serve-static-core";
import {
    CrudController,
    ensureID,
    validate,
    ensureBody,
} from "../crud-controller";
import repo from "./repo";
import auth from "../auth";
import uuid from "uuid";
import { json } from "body-parser";
import validatePut from "./vaildate-put";
import { Customer } from "./types";
/**
 *
 * @param app
 */
export default function configureCrud(app: Express) {
    const { authorize, requireRole } = auth.middleware;
    {
        // 
        const crud = CrudController(repo);
        const endpoint = "customers";
        const route = `/api/${endpoint}/:id?`;
        app.get(route, [authorize, requireRole(["admin"]), crud.get()]);
        // PUT/ADD/NEW
        app.put(route, [
            authorize,
            requireRole(["admin"]),
            json(),
            ensureBody<Customer, keyof Customer>(["contact", "displayName", "email", "enabled", "name", "notes", "phone", "address"]),
            ensureID(uuid),
            validate(validatePut),
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