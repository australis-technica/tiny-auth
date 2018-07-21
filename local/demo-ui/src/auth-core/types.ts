/** */
export type User = {
  id?: string;
  displayName?: string;
  email?: string;
  roles?: string;
};
/** */
export interface Auth {
  login(...args: any[]): any;
  logout(...args: any[]): any;  
}
/** */
export type WebApi = {
  login: (...args: any[]) => Promise<any>;
  logout: (...args: any[]) => Promise<any>;
  profile: (...args: any[]) => Promise<any>;
  refresh: (...args: any[]) => Promise<any>
}
/** */
export type AuthState = {
  profile: User;
  token: string;
  error?: string;
  busy?: boolean;
  authenticated: boolean;
};