import { FluxStandardAction } from "flux-standard-action";
/** */
export type RootState = {
  title: string;
  rootUrl: string;
  viewIndex: number;
};
/** */
const defaultState: RootState = {
  title: process.env.REACT_APP_TITLE || "Tiny-Auth/Demo",
  rootUrl: "/",
  viewIndex: 0
};
/** */
const STORE_KEY = "root";
/** */
const SET_STATE = `@${STORE_KEY}/set-state`;
/** */
export const ActionTypes = {
  SET_STATE
};
/** */
const setState: (
  payload: Partial<RootState>
) => FluxStandardAction<Partial<RootState>, undefined> = payload => ({
  type: SET_STATE,
  payload,
  meta: undefined
});
/** */
export const actions = {
  setState
};
/** Persist */
/**
 *
 * @param defaultState
 */
function tryParse(defaultState: RootState): RootState {
  try {
    const json = localStorage.getItem(STORE_KEY);
    return Object.assign(defaultState, JSON.parse(json || "{}"));
  } catch {
    return defaultState;
  }
}
/** */
const log =
  process.env.NODE_ENV !== "production" ? console.log.bind(console) : () => {};
/**
 *
 */
function trySet(state: RootState) {
  try {
    setTimeout(() => {
      const json = JSON.stringify(state);
      localStorage.setItem(STORE_KEY, json);
    }, 1);
  } catch (e) {
    log(e);
  }
}
const preloaded = tryParse(defaultState);
/** */
export default function reducer<A extends FluxStandardAction<any, any>>(
  state = preloaded,
  action: A
) {
  switch (action.type) {
    case ActionTypes.SET_STATE: {
      const _newSTate = Object.assign({}, state, action.payload);
      trySet(_newSTate);
      return _newSTate;
    }
    default:
      return state;
  }
}
/** */
export const selectors = {
  rawState: (state: {}): RootState => {
    return state[STORE_KEY];
  }
};
