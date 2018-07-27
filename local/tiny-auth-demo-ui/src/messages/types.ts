import { MessageStatus } from "../snackbar-content-with-satus";
export { MessageStatus } from "../snackbar-content-with-satus";
export interface MessagesState {
    message?: string;
    status?: MessageStatus
}

export interface Message { message?: string, status?: MessageStatus }