import { join } from "path";
import createAuthApi, { AuthApi } from "../src";
const fetchMock = require("fetch-mock");

beforeAll(() => {
    fetchMock.mock("*", (url, opts: { body: any, headers: { [key: string]: string }, method: string }) => {

        function tryParse(s: string): any {
            try {
                return JSON.parse(s);
            } catch (error) {
                return undefined
            }
        }

        const body: { [key: string]: any } = tryParse(opts.body) || {};
        const contentType = opts && opts.headers && opts.headers["Content-Type"];
        const Authorization = opts && opts.headers.Authorization;

        switch (url) {
            case "login": {
                if (contentType !== "application/json") {
                    return Promise.reject(`Bad Content-Type: ${contentType}`);
                }
                if (!body || !body.username || !body.password) {
                    return Promise.reject(new Error(`
                    Unauthorized: \n
                    body-type: ${typeof opts.body} \n
                    body: ${opts.body}
                    `));
                }
                return { ok: 200 }
            };
            case "logout": {
                return { ok: 200 };
            }
            case "profile": {
                if (contentType !== "application/json") {
                    return Promise.reject(`Bad Content-Type: ${contentType}`);
                }
                if (!Authorization || Authorization.split("Bearer ")[1] !== "token") {
                    return Promise.reject(`Bad Authorization: ${Authorization}`);
                }
                return { ok: 200 };
            }
            case "refresh": {
                if (contentType !== "application/json") {
                    return Promise.reject(`Bad Content-Type: ${contentType}`);
                }
                if (!Authorization || Authorization.split("Bearer ")[1] !== "token") {
                    return Promise.reject(`Bad Authorization: ${Authorization}`);
                }
                return { ok: 200 };
            }
            case "change-password": {
                if (contentType !== "application/json") {
                    return Promise.reject(`Bad Content-Type: ${contentType}`);
                }
                if (!Authorization || Authorization.split("Bearer ")[1] !== "token") {
                    return Promise.reject(`Bad Authorization: ${Authorization}`);
                }
                return { ok: 200 };
            }
            default: return Promise.reject("invalid url");
        }
    });
});
/** */
afterAll(() => {
    fetchMock.restore();
});
/** Fetch Doesnt exists before 'it' */
function Api() {

    return createAuthApi({
        changePasswordUrl: "change-password",
        loginUrl: "login",
        logoutUrl: "logout",
        profileUrl: "profile",
        refreshUrl: "refresh"
    })
}
/** */
describe(require(join(__dirname, "../package.json")).name, () => {
    it("should login", async () => {
        const api: AuthApi = Api()
        expect(await api.login("x", "x")).toMatchObject({ ok: 200 });
    })
    it("should refresh", async () => {
        const api: AuthApi = Api()
        expect(await api.refresh()).toMatchObject({ ok: 200 });
    })
    it("should get profile", async () => {
        const api: AuthApi = Api()
        expect(await api.profile()).toMatchObject({ ok: 200 });
        // expect(await api.logout()).toThrow("Logout: logout is Not implemented");
    })
    it("change password", async () => {
        const api: AuthApi = Api();
        expect(await api.changePassword("x", "x")).toMatchObject({ ok: 200 });
    })
});