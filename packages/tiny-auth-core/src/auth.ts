/**
 * Client side
 */
export interface Auth {
    login(...args: any[]): any;

    logout(...args: any[]): any;
}