import warn from "./warn";
import { REFRESH } from "./endpoints";
export default async function refresh(token: string): Promise<any> {
    try {
        let r = await fetch(REFRESH, {
            headers: {
                Authorization: `Bearer ${token}`,
                // "Cache-Control": "no-cache",
                Contentype: "application/json",
            },
        });       
        if (!r.ok) {
            return Promise.reject(Object.assign(new Error(r.statusText), { code: r.status }));
        }
        const data = await r.json();
        return data;
    } catch (error) {
        warn(error);
        if (typeof error.message === "string") {
            const m = error.message.toLowerCase();
            if (m === "failed to fetch") {
              error.message = "Network Error";
            }
          }
        return Promise.reject(error);
    }
}

