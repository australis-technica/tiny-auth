
import { debugModule } from "@australis/create-debug";
import newConnection from "@australis/tiny-sql-connection-factory";
import { Connection } from "tedious";
import add from "./add";
import all from "./all";
import byId from "./by-id";
import findBy from "./find-by";
import { User } from "./types";
import update from "./update";
const debug = debugModule(module);
/** */
const users = {
    add: async (user: User) => {
        let connection: Connection;
        try {
            connection = await newConnection();
            const result = await add(connection, user);
            return result;
        } catch (error) {
            debug(error);
            return Promise.reject(error);
        } finally {
            connection && connection.close();
        }
    },
    all: async () => {
        let connection: Connection;
        try {
            connection = await newConnection();
            const result = await all(connection);
            return result;
        } catch (error) {
            debug(error);
            return Promise.reject(error);
        } finally {
            connection && connection.close();
        }
    },
    byId: async (id: string) => {
        let connection: Connection;
        try {
            connection = await newConnection();
            const result = await byId(id)(connection);
            return result;;
        } catch (error) {
            debug(error);
            return Promise.reject(error);
        } finally {
            connection && connection.close();
        }
    },
    findBy: async (key: keyof User, value: string) => {
        let connection: Connection;
        try {
            connection = await newConnection();
            const result = await findBy(connection, key, value);
            return result;
        } catch (error) {
            debug(error);
            return Promise.reject(error);
        } finally {
            connection && connection.close();
        }
    },
    update: async (user: Partial<User> & { id: string }) => {
        let connection: Connection;
        try {
            connection = await newConnection();
            const result = await update(connection, user);
            return result;
        } catch (error) {
            debug(error);
            return Promise.reject(error);
        } finally {
            connection && connection.close();
        }
    }
};
export default users;