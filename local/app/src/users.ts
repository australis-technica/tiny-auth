const users: any[] = [];
const findUser = (id: string) => {
    return Promise.resolve(users.find(u => u.id === id))
}
const updateUser = (_u: any) => {
    return Promise.resolve();
}

export default {
    findUser,
    updateUser
}