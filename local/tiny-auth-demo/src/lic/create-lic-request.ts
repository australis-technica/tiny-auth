import crypto from "crypto";
import os from "os";
import { LicRequest } from "./types";
import secret from "./secret";
/**
 * 
 */
export default function createLicRequest(override: Partial<LicRequest>): LicRequest {
    const hostname = os.hostname();
    const port = process.env.PORT;
    return Object.assign({}, {
        /**
         * Seconds to Expire, from now
         */
        timeToExpire: 60,
        /**
         * internal identifier
         */
        token_id: crypto.randomBytes(8).toString("hex"),
        /**
         * Issuer
         */
        iss: hostname,
        /**
         * internal.name.or.namespace.name.or.fully.qualified.client.app.name?
         */
        aud: "*",
        /**
         * validator: "http://localhost:5000/validate"
         */
        validator: `https://${hostname}:${port}/validate`,
        /**
         * secret: enc-key 
         */
        secret: secret(),
        /**
         * Max concurrent logins
         */
        // max_logins: 1,
        /**
         * use a unique identifier 
         */
        // machine_id: "00:D0:2B:14:84:11",
        /**
         *  INTERNAL
         */
        // client_id: "CLIENT000-XYZ/WHATEVER",
        /**
         * INTERNAL
         */
        // client_name: "Xyz Corp.",

        /**
         * 
         */
        // max_databases: 10,
        /**
         * 
         */
        // databases: ["db1", "db2", "db_else", "etc"],
        /**
         * 
         */
        // sql_server: ["server1", "server2", "server3", "etc"],
        /**
         * 
         */
        // evolution_agents: ["admin", "bob", "tom", "etc"],
    }, override);
}