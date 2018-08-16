/**
 * 
 */
export type Validator = (args: { token: string, token_id: string, verified: { [key: string]: any } }) => Promise<boolean>;