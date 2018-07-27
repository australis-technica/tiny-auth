import storeKey from "./store-key";

export default function(key: string){
    const STORE_KEY = storeKey(key);
    return {
        SET: `@${STORE_KEY}-set`,
        SET_MESSAGE: `@${STORE_KEY}-set-message`,
        CLEAR: `@${STORE_KEY}-clear`,
    }
}