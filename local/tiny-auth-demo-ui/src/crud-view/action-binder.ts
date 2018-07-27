import { Dispatch } from "redux";
import messages, { Message } from "../messages";
import getErrorMessage from "./get-error-message";
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

    const setMessage = (payload: Message) => {
      dispatch(messages.actions.setMessage(payload));
    };

    const clearMessage = () => {
      dispatch(messages.actions.clear());
    };

    const setError = (error?: Error | string) => {
      setMessage({
        message: getErrorMessage(error),
        status: "error"
      });
    };

    const setSuccess = (message: string) => {
      setMessage({ message, status: "success" });
    };

    const confirmActions = confirmActionBinder(setState, "confirmAction")(
      dispatch
    );

    const menuActions = menuActionBinder(setState, "isMenuOpen")(dispatch);

    return {
      setState: (payload: Partial<CrudViewState>) => {
        dispatch(setState(payload));
      },
      setMessage,
      clearMessage,
      setError,
      setSuccess,
      setBusy,
      ...confirmActions,
      ...menuActions,
      delay
    };
  };
  return bindActions;
};
export default actionBinder;
