import "@australis/load-env";
import express from "express";
import initDB from "./init-db";
import start from "./start";
import configure from "./configure";
import Debug from "./debug";
//...
const debug = Debug(__filename);
const app = express();
/** */
Promise.all([initDB(), configure(app), start(app)])
    .catch((error) => {
        debug(error);
        process.exit(-1);
    })