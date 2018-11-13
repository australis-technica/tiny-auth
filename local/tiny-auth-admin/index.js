const express = require("express");
require("dotenv").load({ path: process.env.ENV_PATH || ".env" });
const { configure, start } = require("@local/tiny-auth");
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