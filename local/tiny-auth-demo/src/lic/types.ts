export interface SignRequest {
    /**
     * Seconds to Expire, from now
     */    
    expiresIn: number,
    /**
     * internal identifier
     */
    token_id: string,
    /**
     * Issuer: machine name FQDN ? 
     */
    iss: string,
    /**
     * internal.name.or.namespace.name.or.fully.qualified.client.app.name?
     */
    aud: string,
    /**
     * URL
     * validator: "http://localhost:5000/validate"
     */
    validator: string,
    /**
     * secret: enc-key 
     */
    secret?: string,
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
}