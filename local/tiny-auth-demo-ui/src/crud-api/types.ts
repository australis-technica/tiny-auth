export type CrudApiState = { [key: string]: any } & {
  busy: boolean;
  error: string | undefined;
  data?: any;
};
/** */
export interface CrudApiArgs {
  params?: string[];
  query?: {};
  body?: {};
  method: "GET" | "PUT" | "POST" | "DEL";
  resultKey?: string;
}
/** */
export type CrudApi = (args: CrudApiArgs) => Promise<any>;
/** */
export interface CrudApiOptions {
  resultKey: string;
}
/** */
export interface CrudApiActions {
  fetch(payload: CrudApiArgs): any;
  setResult(data: any): any;
  clearError(): any;
  clearResult(): any;
  setBusy(busy: boolean): any;
  setError(error: string | Error): any;
}
