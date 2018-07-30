import { AuthState } from "@australis/tiny-auth-core";
import { CrudApi } from "./types";
import { log } from "./util";
log("crud-api");

function join(strings?: string[]) {
    if (!strings || !strings.length) {
        return "";
    }
    return strings.join("/");
}

function encode(query?: {}) {
    if (!query) return "";
    const keys = Object.keys(query);
    if (!keys || !keys.length) {
        return "";
    }
    return "?" + keys.map(key => `${key}=${query[key]}`).join("&");
}
/**
 * @param endpoint @description fully resolved
 */
export default function crudApi(austhState: () => AuthState, endpoint: string): CrudApi {

    /**
     * 
     */
    return async function send(args) {
        const { params, query, method, body } = args;
        const headers: HeadersInit = {
            "Authorization": `Bearer ${austhState().token}`,
        }
        if (method !== "GET") {
            headers.body = JSON.stringify(body)
        }
        try {
            const url = `${endpoint}${join(params)}${encode(query)}`;
            log("url: %s", url);
            const r = await fetch(url,
                {
                    method,
                    headers
                }
            );
            if (!r.ok) {
                return Promise.reject(Object.assign(new Error(r.statusText), { code: r.status }));
            }
            // ...
            const contentType = r.headers.get("Content-Type");
            if (contentType && /application\/json.*/.test(contentType)) {
                return Promise.resolve(await r.json());
            }
            return Promise.reject(new Error(`Content-Type: ${contentType}, NOT IMPLEMENTED`))

        } catch (error) {
            return Promise.reject(error)
        }
    }
}