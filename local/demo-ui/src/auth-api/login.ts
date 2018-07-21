import warn from "./warn";
import { LOGIN } from "./endpoints";
/** */
export default async function login(username: string, password: string, ): Promise<any> {
    try {
        let r = await fetch(LOGIN, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                // "Cache-Control": "no-cache",
                "Content-Type": "application/json",
            },
        });
        // TODO: message = await r.json()
        //; !ok && return Promise.reject(Object.assign(new  Error(message), { status, statusText }))
        if (!r.ok) {
            return Promise.reject(new Error(`${r.status}:${r.statusText}`));
        }
        return await r.json();
    } catch (error) {
        warn(error);
        return Promise.reject(error);
    }
};
