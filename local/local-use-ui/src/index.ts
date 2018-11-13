import { Express, Router } from "express";
import { resolve } from "path";
import { static as serveStatic } from "express";
import { debugModule } from '@australis/create-debug';
import { existsSync } from "fs";

const debug = debugModule(module);
const defaultOptions = {
    uiPath: resolve(process.cwd(), "..", "tiny-auth-ui", "build"),
    defaultDocument: "index.html"
};

/** */
export default (options: Partial<typeof defaultOptions> = defaultOptions) => {
    debug({
        ...defaultOptions,
        uiPathExists: existsSync(defaultOptions.uiPath)
    });
    const { uiPath } = { ...defaultOptions, ...(options || defaultOptions) };
    return async <A extends Express | Router>(app: A): Promise<A> => {

        app.use("/", serveStatic(options.uiPath));
        app.use("*", serveStatic(resolve(uiPath, options.defaultDocument)));
        return app;
    }
}