import warn from "./warn";
/**
 * 
 */
export interface Endpoints {
    loginUrl: string;
    logoutUrl: string;
    profileUrl: string;
    refreshUrl: string;
    changePasswordUrl: string;
}
/** */
export default function createAuthApi(endpoints: Endpoints) {
    const { loginUrl, logoutUrl, profileUrl, refreshUrl, changePasswordUrl } = endpoints
    /**
     * 
     * @param username 
     * @param password 
     */
    async function login(username: string, password: string, ): Promise<any> {
        try {
            let r = await fetch(loginUrl, {
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
    }
    /**
     * 
     * @param token 
     */
    async function profile(token: string): Promise<any> {
        try {
            let r = await fetch(profileUrl, {
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
    /**
     * 
     * @param token 
     */
    async function refresh(token: string): Promise<any> {
        try {
            let r = await fetch(refreshUrl, {
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
    /**
     * NOT IMPLEMENTED
     */
    const logout = () => { throw new Error(`Logout: ${logoutUrl} is Not implemented`) };
    /**
     * 
     */
    async function changePassword(token: string, oldPassword: string, newPassword:  string) {
        try {
            let r = await fetch(changePasswordUrl, {
                method: "POST",
                headers: {                    
                    Authorization: `Bearer ${token}`,
                    // "Cache-Control": "no-cache",
                    Contentype: "application/json",
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword
                })
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
    /**
     * 
     */
    return {
        login,
        profile,
        refresh,
        logout,
        changePassword
    };
}