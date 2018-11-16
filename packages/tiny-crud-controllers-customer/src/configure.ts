import { debugModule } from "@australis/create-debug";
import repo, { Customer, TABLE_NAME } from "@australis/tiny-repos-customer";
import { CrudController, ensureBody, ensureID, validate } from "@australis/tiny-crud-controller";
import { json } from "body-parser";
import { Express, RequestHandler, Router } from "express";
import uuid from "uuid";
import validatePut from "./vaildate-put";
const debug = debugModule(module);
/**
 * typescript has problems importing "arrify"
 */
function arrify<T>(t: T | (T[])): T[] {
    return t === null || t === undefined ? [] : Array.isArray(t) ? t : [t];
}
/** */
export interface Options {
    baseUrl: string,
    get?: {
        before?: RequestHandler | (RequestHandler[])
    },
    put?: {
        before?: RequestHandler | (RequestHandler[])
    },
    post?: {
        before?: RequestHandler | (RequestHandler[])
    },
    del?: {
        before?: RequestHandler | (RequestHandler[]);
    },
    download?: {
        path?: string;
        before?: RequestHandler | (RequestHandler[]);
        fileName?: string;
    }
};
/**
 * Configure 
 */
export default (o: Options) => <A extends Express | Router>(app: A): A => {
    const crud = CrudController(repo);
    const route = `${o.baseUrl}/:id?`;
    /**
     * 
     */
    app.get(route, [...arrify(o.get && o.get.before), crud.get()]
        .filter(Boolean) // allow truthy/falsy && handler
    );
    /**
     * 
     */
    app.put(route, [
        ...arrify(o.put && o.put.before),
        json(), // Required , handles JSON Only
        ensureBody<Customer, keyof Customer>(["contact", "displayName", "email", "enabled", "name", "notes", "phone", "address"]),
        ensureID(uuid),
        validate(validatePut),
        ((req, _res, next) => {
            // include user: because target database table needs userid field
            try {
                req.body.userid = req.user.id
                return next();
            } catch (error) {
                return next(error);
            }
        }) as RequestHandler,
        crud.put()
    ]
        .filter(Boolean)// allow truthy/falsy && handler
    );
    /**
     * 
     */
    app.post(route, [
        ...arrify(o.post && o.post.before),
        json(), // Required , handles JSON Only
        ensureBody(),
        ensureID(), // reject missing id
        crud.post()
    ].filter(Boolean));
    /**
     * 
     */
    app.delete(route, [
        ...arrify(o.del && o.del.before),
        json(), // Required , handles JSON Only
        ensureBody(),
        ensureID(), // reject no id        
        crud.dlete()
    ]
        .filter(Boolean) // allow truthy/falsy && handler
    );
    /**
     * Download?
     */
    const download: RequestHandler = async (req, res, next) => {
        try {
            if (!req.params.id) {
                return res.status(400).send("Id required");
            }
            const found = await repo.byId(req.params.id);
            if (!found) {
                return res.status(404).send("Id not found");
            }
            return res
                .attachment((o.download && o.download.fileName) || `${TABLE_NAME}.json`)
                .send(JSON.stringify(found, null, 2));
        } catch (error) {
            return next(error);
        }
    };
    const downloadPathh = o.download && o.download.path;
    app.get(`${o.baseUrl}/${downloadPathh || "download"}/:id?`, [
        ...arrify(o.download && o.download.before),
        download,
    ])
    debug("configured");
    return app;

}