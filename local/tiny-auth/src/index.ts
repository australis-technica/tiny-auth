import "@australis/load-env";
import express from "express";
import initDB from "./init-db";
import start from "./start";
import configure from "./configure";

import {  port } from "./env";
//
const app = express();
/** */
Promise.all([
    initDB(),
    configure(app),
    start(app, port)])
    .catch((error) => {
        console.error(error);
        process.exit(-1);
    });
export default {
    // ...
}