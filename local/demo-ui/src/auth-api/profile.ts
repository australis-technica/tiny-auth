import warn from "./warn";
import { PROFILE } from "./endpoints";
export default async function apiProfile(token: string): Promise<any> {
    try {
        let r = await fetch(PROFILE, {
            headers: {
                Authorization: `Bearer ${token}`,
                // "Cache-Control": "no-cache",
                Contentype: "application/json",
            },
        });
        // TODO: message = await r.json()
        //; !ok && return Promise.reject(Object.assign(new  Error(message), { status, statusText }))
        if (!r.ok) {
            return Promise.reject(new Error(`${r.status}:${r.statusText}`));
        }
        const data = await r.json();
        return data;
    } catch (error) {
        warn(error);
        return Promise.reject(error);
    }
}