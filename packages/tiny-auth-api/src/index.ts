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
export interface Options {
    getToken?: () => string | undefined | null;
}
// ...
const defaultOptions: Options = {

}
/** */
export interface AuthApi {
    login(username: string, password: string): Promise<any>;
    profile(): Promise<any>;
    refresh(): Promise<any>
    logout(): Promise<any>;
    changePassword(password: string, newPassword: string): Promise<any>;
}
/** */
export default function createAuthApi(endpoints: Endpoints, options?: Partial<Options>): AuthApi {

    let { getToken } = {
        ...defaultOptions,
        ...(options || defaultOptions)
    }
    getToken = getToken || (() => localStorage.getItem("token"));
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
                // credentials: "same-origin",
                headers: {
                    "Cache-Control": "no-cache",
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
            if (typeof error.message === "string") {
                if (error.message.toLowerCase() === "failed to fetch") {
                    error.message = "Network Error";
                }
            }
            return Promise.reject(error);
        }
    }
    /**
     * 
     * @param token 
     */
    async function profile(): Promise<any> {
        if(!getToken) throw new Error("getToken?");
        try {
            let r = await fetch(profileUrl, {
                credentials: "same-origin",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Cache-Control": "no-cache",
                    "Content-Type": "application/json",
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
            if (typeof error.message === "string") {
                if (error.message.toLowerCase() === "failed to fetch") {
                    error.message = "Network Error";
                }
            }
            return Promise.reject(error);
        }
    }
    /**
     * 
     * @param token 
     */
    async function refresh(): Promise<any> {
        if(!getToken) throw new Error("getToken?");
        try {
            let r = await fetch(refreshUrl, {
                credentials: "same-origin",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Cache-Control": "no-cache",
                    "Content-Type": "application/json",
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
                if (error.message.toLowerCase() === "failed to fetch") {
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
    async function changePassword(password: string, newPassword: string) {
        if(!getToken) throw new Error("getToken?");
        /** */
        try {
            let r = await fetch(changePasswordUrl, {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Cache-Control": "no-cache",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password,
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
            if (typeof error.message === "string") {
                if (error.message.toLowerCase() === "failed to fetch") {
                    error.message = "Network Error";
                }
            }
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