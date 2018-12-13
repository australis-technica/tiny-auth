import Crypto from "@australis/tiny-crypto";

const crypto = new Crypto("ABRACADABRA12345");

export type User = {
    id?: string;
    displayName?: string;
    email?: string;
    roles?: string;
    password?: string;
    disabled?: boolean;
};

let _users: User[] = [
    { id: "admin", displayName: "Admin", disabled: false, email: "admin@localhost.local", password: crypto.encrypt("admin"), roles: "admin" }
];

const findOne = (id: string) => {
    return Promise.resolve(_users.find(u => u.id === id))
}

const update = (id: string, user: User) => {
    _users = _users.filter(x => x.id !== id).concat([user]);
}

const users = {
    findOne,
    update,
    validateCredentials: async (name: string, pass: string) => {
        const x = await findOne(name);
        if (!x) return Promise.resolve(undefined);
        try {
            if (crypto.decrypt(x.password) !== pass) {
                return Promise.resolve(undefined);
            }
        } catch (error) {
            return Promise.resolve(undefined);
        }
        return Promise.resolve(x)
    },
    async changePassword(name: string, pass: string, newPass: string) {
        const x = await findOne(name);
        if (!x) return Promise.reject(new Error("Invalid Credentials"));
        if (crypto.decrypt(x.password) !== pass) {
            return Promise.reject("Invalid Credentials");
        }
        const user = { ...x, password: crypto.encrypt(newPass) };
        update(name, user)
        return user;
    }
}

export default users;