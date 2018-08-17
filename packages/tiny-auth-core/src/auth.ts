/**
 * Client side
 */
export interface Auth {
    login(username: string, password: string): any;
    logout(): any;
    changePassword(password: string, newpassword: string): any;
}