import { FormData } from "./types";
/** */
export default function createSelector<T extends FormData = FormData>(
  storeKey: string
) {
  return function selector(state: {}) {
    return state[storeKey] as T;
  };
}
