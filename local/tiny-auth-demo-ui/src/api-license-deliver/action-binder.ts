import { Dispatch } from "redux";
import api from "./api";
/** */
export default function (dispatch: Dispatch) {
    const actions = api.bindActions(dispatch);
    return {
        ...actions,
        deliver: (id: string) => {
            return dispatch(actions.fetch({ method: "POST", body: { id }, params: ["deliver "] }));
        }
    }
}