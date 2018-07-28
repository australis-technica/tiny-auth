import { PREFIX } from "./constants";

export default function(viewName: string) {
  /** */
  const SET_STATE = `@${PREFIX}-${viewName}/set-state`;
  /** */
  return {
    SET_STATE
  };
}
