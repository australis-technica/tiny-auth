import { Express, Router } from "express";

/** not-a-module */
export default () => async <A extends Express | Router>(app: A): Promise<A> => {
    const { configure: products } = await import("@local/products");    
    await products(app);
    const { configure: customers } = await import("@local/customers");
    await customers(app);
    const { configure: lilcenses } = await import("@local/licenses");
    await lilcenses(app);
    const { configure: deliver } = await import("@local/deliver");
    await deliver(app);
    return app;
}