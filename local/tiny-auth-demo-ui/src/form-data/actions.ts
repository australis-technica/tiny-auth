import actionTypes from "./action-types";
import { FluxStandardAction } from "flux-standard-action";
/**
 *
 * @param viewName
 */
export default function(viewName: string) {
  const { SET_STATE, SET_VALUE, RESET, } = actionTypes(viewName);
  /** */
  const setState: (
    payload: {}
  ) => FluxStandardAction<Partial<{}>, undefined> = payload => ({
    type: SET_STATE,
    payload,
    meta: undefined
  });
  const setValue = (
    key: string,
    value: any
  ): FluxStandardAction<Partial<{}>> => ({
    type: SET_VALUE,
    payload: { key, value },
    meta: undefined
  });
  const reset = (): FluxStandardAction<undefined> => ({
    type: RESET,
    payload: undefined,
    meta: undefined
  });
  return {
    setState,
    setValue,
    reset
  };
}
