export interface TokenBlackList {
    isBlackListed(token: string): Promise<boolean>;
    add(token: string):Promise<any>;
}