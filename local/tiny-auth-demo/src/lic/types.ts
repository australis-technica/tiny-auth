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
}
/**
 * 
 */
export type Validator = (args: { token: string, token_id: string, verified: { [key: string]: any } }) => Promise<boolean>;