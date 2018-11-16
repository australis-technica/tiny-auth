import { Express, Router } from "express";
/**
 * Configure Admin/Api
 */
export default () => async <A extends Express | Router>(app: A): Promise<A> => {

    const { default: auth } = await import("@local/auth");
    const { authorize, requireRole } = auth.middleware;
    // ...
    {
        const { configure: products } = await import("@australis/tiny-crud-controllers-product");
        const confgiure = products({
            baseUrl: "/api/products",
            get: {
                before: [authorize, requireRole(["admin"])]
            },
            put: {
                before: [authorize, requireRole(["admin"])]
            },
            post: {
                before: [authorize, requireRole(["admin"])]
            },
            del: {
                before: [authorize, requireRole(["admin", "delete"])]
            },
            download: {
                before: [authorize, requireRole(["admin", "dowmload"])]
            }
        });
        await confgiure(app);
    }
    // ...
    {
        const { configure: customers } = await import("@australis/tiny-crud-controllers-customer");
        const configure = customers({
            baseUrl: "/api/customers",
            get: {
                before: [authorize, requireRole(["admin"])]
            },
            put: {
                before: [authorize, requireRole(["admin"])]
            },
            post: {
                before: [authorize, requireRole(["admin"])]
            },
            del: {
                before: [authorize, requireRole(["admin", "delete"])]
            },
            download: {
                before: [authorize, requireRole(["admin", "dowmload"])]
            }
        });
        configure(app);
    }
    // ...
    {
        app.use("/api/licenses", (req, _res, next) => {
            console.log(req.path);
            next();
        })
        const { configure: licenses } = await import("@australis/tiny-crud-controllers-license");
        const configure = licenses({
            baseUrl: "/api/licenses",
            get: {
                before: [authorize, requireRole(["admin"])]
            },
            put: {
                before: [authorize, requireRole(["admin"])]
            },
            post: {
                before: [authorize, requireRole(["admin"])]
            },
            del: {
                before: [authorize, requireRole(["admin", "delete"])]
            },
            download: {
                before: [authorize, requireRole(["admin", "download"])]
            }
        });
        configure(app);
    }
    const { configure: deliver } = await import("@local/deliver");
    await deliver(app);
    return app;
}