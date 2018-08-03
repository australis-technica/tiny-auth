import * as ReactDOMServer from "react-dom/server";
import React = require("react");
import { resolve } from "path";
/** */
export default function renderTemplate(templateName: string, data: any): string {
    const template: React.ComponentType = require(resolve(process.cwd(), "templates", templateName)).default;
    return ReactDOMServer.renderToString(
        React.createElement(template, data)
    );
}