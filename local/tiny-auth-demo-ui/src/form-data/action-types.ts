import { PREFIX } from "./constants";

export default function(viewName: string) {
  /** */
  const SET_STATE = `@${PREFIX}-${viewName}/set-state`;
  const SET_VALUE = `@${PREFIX}-${viewName}/set-value`;
  /** */
  return {
    SET_STATE,
    SET_VALUE
  };
}
