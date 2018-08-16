import "@australis/load-env";
import express from "express";
import initDB from "./init-db";
import start from "./start";
import configure from "./configure";
import configureCrud from "./configure-crud";
import configureValidate from "./configure-validate";
import configureDeliver from "./configure-deliver";
import configureAuth from "./configure-auth";
import { isAdmin, isValidate, port } from "./env";
//
const app = express();
/** */
Promise.all([
    initDB(),
    configure(app, [
        configureAuth,
        /** CRUD: admin*/
        isAdmin && configureCrud,
        isAdmin && configureDeliver,
        /** api/v1 */
        isValidate && configureValidate,
    ]),
    start(app, port)])
    .catch((error) => {
        console.error(error);
        process.exit(-1);
    })