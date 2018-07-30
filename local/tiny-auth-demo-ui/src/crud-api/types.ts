export type CrudApiState = { [key: string]: any } & {
  busy: boolean;
  error: string | undefined;
  data?: any;
};
export type CrudAPiVerb = "GET" | "PUT" | "POST" | "DEL";
export const verbs: CrudAPiVerb[] = ["GET", "PUT", "POST", "DEL"];
/** */
export interface CrudApiArgs {
  params?: string[];
  query?: {};
  body?: {};
  method: CrudAPiVerb;
}
/** */
export type CrudApi = (args: CrudApiArgs) => Promise<any>;
/** */
export interface CrudApiOptions {
  resultKey: string;
  endpoint?: string;
  prefix?: string;
}
/** */
export interface CrudApiActions {
  fetch(payload: CrudApiArgs): any;
  setResult(data: any): any;
  clearError(): any;
  clearResult(): any;
  clearSuccess(): any;
  setBusy(busy: boolean): any;
  setError(error: string | Error): any;
}
