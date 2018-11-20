import { debugModule } from "@australis/create-debug";
import newConnection from "@australis/tiny-sql-connection-factory";
import { Connection } from "tedious";
import { add, all, byId, findBy, update } from "./";
const debug = debugModule(module);
/** */
const users = {
  add: async (...args: any[]) => {
    let connection: Connection;
    try {
      connection = await newConnection();
      const result = await add(connection, args[0]);
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
  byId: async (...args: any[]) => {
    let connection: Connection;
    try {
      connection = await newConnection();
      const result = await byId(args[0])(connection);
      return result;;
    } catch (error) {
      debug(error);
      return Promise.reject(error);
    } finally {
      connection && connection.close();
    }
  },
  findBy: async (...args: any[]) => {
    let connection: Connection;
    try {
      connection = await newConnection();
      const result = await findBy(connection, args[0], args[1]);
      return result;
    } catch (error) {
      debug(error);
      return Promise.reject(error);
    } finally {
      connection && connection.close();
    }
  },
  update: async (...args: any[]) => {
    let connection: Connection;
    try {
      connection = await newConnection();
      const result = await update(connection, args[0]);
      return result;
    } catch (error) {
      debug(error);
      return Promise.reject(error);
    } finally {
      connection && connection.close();
    }
  }
};
export default users ;