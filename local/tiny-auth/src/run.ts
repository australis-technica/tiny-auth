import "@australis/load-env";
import express from "express";
import start from "./start";
import configure from "./configure";
const port = Number(process.env.PORT);
//
const app = express();
/** */
Promise.all([
    configure(app),
    start(app, port)])
    .catch((error) => {
        console.error(error);
        process.exit(-1);
    }).then(() => {
        console.log("Started")
    });