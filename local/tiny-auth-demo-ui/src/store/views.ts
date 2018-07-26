import { adapter as rootAdapter } from "../app";
import { storeAdapter as view1 } from "../customers";
import { adapter as home } from "../home";
/**
 *
 */
export default {
  [view1.storeKey]: view1.reducer,
  [rootAdapter.storeKey]: rootAdapter.reducer,
  [home.storeKey]: home.reducer
};
