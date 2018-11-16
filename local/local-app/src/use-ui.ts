import { debugModule } from '@australis/create-debug';
import { Express, Router, static as serveStatic } from "express";
import { existsSync } from "fs";
import { resolve, isAbsolute } from "path";

const debug = debugModule(module);
const defaultOptions = {
    uiPath: "",
    defaultDocument: "index.html"
};

/** */
export default (options: Partial<typeof defaultOptions> = defaultOptions) => {
    const { uiPath, defaultDocument } = {
        ...defaultOptions,
        ...(options || defaultOptions)
    };
    debug({
        uiPath,
        defaultDocument,
        uiPathExists: existsSync(uiPath)
    });
    if (!uiPath) throw new Error("uiPath is required");
    if (!defaultDocument) throw new Error("defaultDocument  is required");
    if(!isAbsolute(uiPath)) throw new Error(`uiPath:'${uiPath}'  Should be Absolute Path`);
    /** */
    return async <A extends Express | Router>(app: A): Promise<A> => {
        app.use("/", serveStatic(options.uiPath));
        app.use("*", serveStatic(resolve(uiPath, defaultDocument)));
        return app;
    }
}