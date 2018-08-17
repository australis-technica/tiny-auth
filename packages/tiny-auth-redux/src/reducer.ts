import { FSA } from "flux-standard-action";
import { isError, setPartial } from "./util";
import { actionTypes } from "./actions";
import { defaultState, TOKEN_KEY } from "./constants";
import { AuthState } from "@australis/tiny-auth-core";
/** */
const { CLEAR_ERROR, CLEAR_PROFILE, SET_BUSY, SET_ERROR, SET_PROFILE, SET_TOKEN, SET_AUTHENTICATED, SET_PASSWORD_CHANGED, SET_PASSWORD_CHANGING } = actionTypes;
/** */
const reducer = (state: AuthState = defaultState, action: FSA<any>): AuthState => {
  switch (action.type) {
    case CLEAR_ERROR: {
      return setPartial(state, { error: undefined });
    }
    case CLEAR_PROFILE: {
      return setPartial(state, {
        profile: undefined,
        token: undefined,
        // busy: false,
        // error: undefined,
        // prevLocation: undefined
      });
    }
    case SET_BUSY: {
      const busy = action.payload;
      return setPartial(state, { busy });
    }
    case SET_ERROR: {
      const { payload } = action;
      let message: string = isError(payload) ? payload.message : payload;
      if (message && message.toLowerCase() === "failed to fetch") {
        message = "Network Error";
      }
      return setPartial(state, { error: message });
    }
    case SET_PROFILE: {
      const { payload } = action;
      return setPartial(state, { profile: payload });
    }
    case SET_TOKEN: {
      const token = action.payload;
      localStorage.setItem(TOKEN_KEY, token);
      return setPartial(state, { token });
    }
    case SET_AUTHENTICATED: {
      const authenticated = action.payload;
      return setPartial(state, { authenticated });
    }
    case SET_PASSWORD_CHANGED: {
      const passwordChanged: boolean = action.payload;
      return setPartial(state, { passwordChanged })
    }
    case SET_PASSWORD_CHANGING: {
      const passwordChanging: boolean = !!action.payload;
      return setPartial(state, { passwordChanging })
    }
    default:
      return state;
  }
};
export default reducer;