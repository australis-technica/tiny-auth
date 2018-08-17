import { Auth, AuthState, User, WebApi } from "@australis/tiny-auth-core";
import { getTokenMillisecondsToExpire, getTokenPayload, isTokenExpired, isValidToken } from "@australis/tiny-auth-token-payload";
import { MIN_TIME_TO_REFRESH } from "./constants";
/** */
const warn = process.env.NODE_ENV !== 'production' ? console.error.bind(console) : () => { };
const debug = process.env.NODE_ENV !== 'production' ? console.log.bind(console) : () => { };
const delay = (n: number) => new Promise((resolve) => setTimeout(resolve, n));
/** */
export type AuthHandlerActions = {
    setBusy: (value: boolean) => any;
    setError: (value: string | Error) => any;
    setToken: (value: string) => any;
    setProfile: (value: User) => any;
    setAuthenticated: (value: boolean) => any,
    clearProfile: () => any
    clearError: () => any;
    setPasswordChanged(value: boolean): any;
    setPasswordChanging(value: boolean): any;
}
/** */
export default function AuthHandler(
        getState: () => AuthState, actions: AuthHandlerActions, webApi: WebApi
    ): Auth {
    const { setBusy, setError, setToken, setProfile, setAuthenticated, clearProfile, clearError, setPasswordChanged, setPasswordChanging } = actions;
    
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
            if (!await isValidToken(state.token)) {
                throw new Error("Can't auto-refresh: Invalid Token");
            }
            if (await isTokenExpired(state.token)) {
                throw new Error("Token expired");
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
        setToken(token);
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
        setToken("");
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
    /**
     * 
     * @param password 
     * @param newPassword 
     */
    async function changePassword(password: string, newPassword: string) {
        try {
            clearError();
            setBusy(true);
            setPasswordChanging(true);
            const token = getToken();
            await webApi.changePassword(token, password, newPassword);
            const { id } = getState().profile;
            await logout();
            login(id, newPassword);
            setPasswordChanged(true);
            setPasswordChanging(false);
            await delay(10000);
            setPasswordChanged(false);
        } catch (error) {
            setError(error);
        } finally {
            setPasswordChanging(false);
            setBusy(false);
        }
    }
    // contructor ...
    async function init() {
        try {
            setBusy(true)
            const token = getToken();
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
        changePassword
    }
}