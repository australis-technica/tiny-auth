import { Express, Router } from "express";
/**
 * Configure Admin/Api
 */
export default () => async <A extends Express | Router>(app: A): Promise<A> => {
  const { default: auth } = await import("./auth");
  const { authorize, requireRole } = auth.middleware;
  // ...
  {
    const {
      configure: products,
    } = await import("@australis/tiny-license-controller-product");
    const confgiure = products({
      baseUrl: "/api/products",
      get: {
        before: [authorize, requireRole(["admin"])],
      },
      put: {
        before: [authorize, requireRole(["admin"])],
      },
      post: {
        before: [authorize, requireRole(["admin"])],
      },
      del: {
        before: [authorize, requireRole(["admin", "delete"])],
      },
      download: {
        before: [authorize, requireRole(["admin", "dowmload"])],
      },
    });
    await confgiure(app);
  }
  // ...
  {
    const {
      configure: customers,
    } = await import("@australis/tiny-license-controller-customer");
    const configure = customers({
      baseUrl: "/api/customers",
      get: {
        before: [authorize, requireRole(["admin"])],
      },
      put: {
        before: [authorize, requireRole(["admin"])],
      },
      post: {
        before: [authorize, requireRole(["admin"])],
      },
      del: {
        before: [authorize, requireRole(["admin", "delete"])],
      },
      download: {
        before: [authorize, requireRole(["admin", "dowmload"])],
      },
    });
    configure(app);
  }
  // ...
  {
    app.use("/api/licenses", (req, _res, next) => {
      console.log(req.path);
      next();
    });
    const {
      configure: licenses,
    } = await import("@australis/tiny-license-controller-license");
    const configure = licenses({
      baseUrl: "/api/licenses",
      get: {
        before: [authorize, requireRole(["admin"])],
      },
      put: {
        before: [authorize, requireRole(["admin"])],
      },
      post: {
        before: [authorize, requireRole(["admin"])],
      },
      del: {
        before: [authorize, requireRole(["admin", "delete"])],
      },
      download: {
        before: [authorize, requireRole(["admin", "download"])],
      },
      deliver: {
        before: [authorize, requireRole(["user"])],
      },
    });
    configure(app);
  }  
  return app;
};