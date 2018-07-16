import { FluxStandardAction } from "flux-standard-action";
/** */
export type RootState = {
    title: string
};
/** */
const defaultState: RootState = {
    title: "Tiny-Auth/Demo"
};
/** */
const STORE_KEY = "root";
/** */
const SET_STATE = `@${STORE_KEY}/set-state`
/** */
export const ActionTypes = {
    SET_STATE
}
/** */
const setState: (payload: Partial<RootState>) => FluxStandardAction<Partial<RootState>, undefined> = (payload) => ({
    type: SET_STATE,
    payload,
    meta: undefined
});
/** */
export const actions = {
    setState
};
/** */
export default function reducer<A extends FluxStandardAction<any, any>>(state = defaultState, action: A) {
    switch (action.type) {
        case ActionTypes.SET_STATE: {
            return Object.assign(state, action.payload)
        }
        default: return state;
    }
}
/** */
export const selectors = {
    rawState: (state: {}): RootState => { return state[STORE_KEY]; }
}