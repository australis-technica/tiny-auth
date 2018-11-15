import { debugModule } from "@australis/create-debug";
import repo, { Customer } from "@australis/tiny-auth-customers";
import { CrudController, ensureBody, ensureID, validate } from "@australis/tiny-crud-controller";
import auth from "@local/auth";
import { json } from "body-parser";
import { Express, RequestHandler, Router } from "express";
import uuid from "uuid";
import validatePut from "./vaildate-put";
const debug = debugModule(module);
/**
 *
 * @param app
 */
export default async function configureCrud<A extends Express|Router>(app: A): Promise<A> {
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
            requireRole(["admin"]),
            json(),
            ensureBody(),
            ensureID(), // reject no id
            requireRole(["admin", "delete"]),
            crud.dlete()
        ]);
        debug("configured");
        return app;
    }
}