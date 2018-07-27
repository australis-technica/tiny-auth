import { FluxStandardAction } from "flux-standard-action";
import actionTypes from "./action-types";
import { Message, MessageStatus } from "./types";
/**
 * 
 */
export default function (key: string) {
    const { SET, CLEAR, SET_MESSAGE } = actionTypes(key)
    const set = (message: string, status: MessageStatus): FluxStandardAction<Message> => ({
        type: SET,
        payload: {
            message,
            status
        },
        meta: undefined
    });
    const setMessage = (payload: Message): FluxStandardAction<Message> => ({
        type: SET_MESSAGE,
        payload,
        meta: undefined
    });
    const clear = (): FluxStandardAction<undefined> => ({
        type: CLEAR,
        payload: undefined,
        meta: undefined
    })
    return {
        clear,
        set,
        setMessage,
    }
}