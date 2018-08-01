import crypto from "crypto";
import { LicRequest } from "./types";
import secret from "./secret";
import issuer from "./issuer"
/**
 * @description in seconds
 */
const ONE_DAY = 60 * 60 * 24;
/**
 * 
 */
export default function createLicRequest(payload: Partial<LicRequest>): LicRequest {
    const hostname = issuer();
    const port = process.env.PORT;
    const { timeToExpire, aud, validator, token_id, ...extra } = payload;
    return Object.assign({}, {
        /**
         * Seconds to Expire, from now
         */
        timeToExpire: timeToExpire || ONE_DAY,
        /**
         * internal identifier
         */
        token_id: token_id|| crypto.randomBytes(8).toString("hex"),
        /**
         * Issuer
         */
        iss: hostname,
        /**
         * internal.name.or.namespace.name.or.fully.qualified.client.app.name?
         */
        aud: aud || "*",
        /**
         * validator: "http://localhost:5000/validate"
         */
        validator: validator || `https://${hostname}:${port}/validate`,
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
    }, extra);
}