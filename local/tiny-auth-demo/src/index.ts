import "@australis/load-env";
import express from "express";
import initDB from "./init-db";
import start from "./start";
import configure from "./configure";
//
const app = express();
/** */
Promise.all([initDB(), configure(app), start(app)])
    .catch((error) => {
        console.error(error);
        process.exit(-1);
    })