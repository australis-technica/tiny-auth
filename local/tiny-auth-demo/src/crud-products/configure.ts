import { Express } from "express-serve-static-core";
import {
    CrudController,
    ensureID,    
    ensureBody,    
} from "../crud-controller";
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
    }
}