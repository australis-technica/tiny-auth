import { Reducer } from "redux";
import { MessagesState } from "./types";
import actionTypes from "./action-types"
export default function (key: string, defaultState: MessagesState = {}): Reducer {
    const { SET, CLEAR, SET_MESSAGE } = actionTypes(key);
    /** */
    return (state = defaultState, action) => {
        switch (action.type) {
            case SET: {
                const { payload } = action;
                return Object.assign({}, state, payload);
            }
            case SET_MESSAGE: {
                const { payload } = action;
                return Object.assign({}, state, payload);
            }
            case CLEAR: {
                return Object.assign({}, state, { message: undefined, status: undefined });
            }
            default: return state;
        }
    }
}