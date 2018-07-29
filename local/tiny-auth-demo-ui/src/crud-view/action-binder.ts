import { Dispatch } from "redux";
import messages from "../messages";
import { CrudViewState } from "./types";
import { actionBinder as confirmActionBinder } from "../confirm-action";
import { actionBinder as menuActionBinder } from "../menu";
/** */
const actionBinder = (setState: (payload: Partial<CrudViewState>) => any) => {
  /** */
  const bindActions = (dispatch: Dispatch) => {
    const setBusy = (busy: boolean) => {
      dispatch(setState({ busy }));
    };
    const delay = (n: number) => new Promise(resolve => setTimeout(resolve, n));
    const confirmActions = confirmActionBinder(setState, "confirmAction")(
      dispatch
    );
    const menuActions = menuActionBinder(setState, "isMenuOpen")(dispatch);
    const messageAction = messages.bindActions(dispatch);
    return {
      setState: (payload: Partial<CrudViewState>) => {
        dispatch(setState(payload));
      },
      ...messageAction,
      setBusy,
      ...confirmActions,
      ...menuActions,
      delay
    };
  };
  return bindActions;
};
export default actionBinder;
