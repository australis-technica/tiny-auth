import { WebApi, Auth, AuthState, User } from "../auth-core";
import { isTokenExpired, getTokenMillisecondsToExpire, getTokenPayload, isValidToken } from "../token-tools";
import { MIN_TIME_TO_REFRESH } from "./constants";
/** */
const warn = process.env.NODE_ENV !== 'production' ? console.error.bind(console) : () => { };
const debug = process.env.NODE_ENV !== 'production' ? console.log.bind(console) : () => { };
/** */
export type AuthHandlerActions = {
    setBusy: (value: boolean) => any;
    setError: (value: string | Error) => any;
    setToken: (value: string) => any;
    setProfile: (value: User) => any;
    setAuthenticated: (value: boolean) => any,
    clearProfile: () => any
    clearError: () => any;
}
/** */
export default function AuthHandler(getState: () => AuthState, actions: AuthHandlerActions, webApi: WebApi): Auth {
    const { setBusy, setError, setToken, setProfile, setAuthenticated, clearProfile, clearError } = actions;
    function readToken() {
        return localStorage.getItem("token");
    }
    function saveToken(token: string) {
        setToken(token);
        localStorage.setItem("token", token);
    }
    /** */
    function getToken(): string {
        const state = getState();
        return state.token;
    }

    /** */
    const autoRefreshCallback = async () => {
        try {
            const state = getState();;
            if (state.busy) {
                // this shoudln't happen
                throw new Error("Can't auto-refresh: Auth busy");
            }
            if (!isValidToken(state.token)) {
                throw new Error("Can't auto-refresh: Invalid Token");
            }
            if (isTokenExpired(state.token)) {
                throw new Error("Token expired");
                return false;
            }
            if (!state.authenticated) {
                warn("Can't auto-refresh Non authenticated state");
                throw new Error("Can't refresh");
            }
            loginSuccess(await refresh(getToken()));
            autoRefresh();
        } catch (error) {
            warn("login out due to error %s", error.message)
            logout();
        }
    };
    /** */
    function autoRefresh() {
        const token = getToken();
        if (!isValidToken(token)) {
            warn("can't auto-refresh invalid token");
            logout();
            return;
        }
        if (isTokenExpired(token)) {
            warn("Token expired");
            logout();
            return;
        }
        const time = getTokenMillisecondsToExpire(token) - MIN_TIME_TO_REFRESH;
        debug(
            "timer set to: milliseconds=%s, seconds=%s, minutes=%s, hours=%s",
            time, time / 1000, time / 1000 / 60, time / 1000 / 60 / 60
        );
        if (time < MIN_TIME_TO_REFRESH) {
            debug("too late set timer only %s milliseconds left according to MIN_TIME_TO_REFRESH: %s", time, MIN_TIME_TO_REFRESH);
            return;
        }
        setTimeout(autoRefreshCallback, time)
    }
    /** */
    function loginSuccess(token: string) {
        debug("login success");
        const profile = getTokenPayload(token, "profile");
        saveToken(token);
        setProfile(profile);
        setAuthenticated(true);
    }
    /** */
    const login = async (...args: any[]) => {
        try {
            clearError();
            setBusy(true);
            // ...
            const [username, password] = args as string[];
            const r = await webApi.login(username, password);
            loginSuccess(r.token);
            autoRefresh();
        } catch (error) {
            setError(error)
            logout();
        } finally {
            setBusy(false);
        }
    };
    /** */
    const logout = () => {
        clearProfile()
        saveToken("");
        setAuthenticated(false);
    }
    /** */
    const refresh = async (token: string): Promise<string> => {
        try {
            debug("refresh");
            setBusy(true);
            // 
            const r = await webApi.refresh(token);
            if (!isValidToken(r.token)) {
                return Promise.reject("api returned Invalid token");
            }
            debug("refresh: completed");
            return Promise.resolve(r.token);
        } catch (error) {
            warn("refresh: failed");
            return Promise.reject(error);
        } finally {
            setBusy(false)
        }
    };
    // contructor ...
    async function init() {
        try {
            setBusy(true)
            const token = readToken();
            if (!isValidToken(token)) {
                throw new Error("can't init: invalid token");                
            }
            if (isTokenExpired(token)) {
                throw new Error("can't init: invalid token expired");                
            }
            loginSuccess(await refresh(token));
            autoRefresh();
        } catch (error) {
            warn(error);
            // logout();
        } finally {
            setBusy(false);
        }
    }
    init();
    /** */
    return {
        login,
        logout,
    }
}