
let _blackList: any[] = [];
const findOne = (token: string) => Promise.resolve(_blackList.find(t => t === token));
const add = (token: string) => {
    _blackList.push(token);
    return Promise.resolve();
}
const blackList = {
    findOne,
    add,
    clear: () => {
        _blackList = [];
        Promise.resolve();
    }
}
export default blackList;