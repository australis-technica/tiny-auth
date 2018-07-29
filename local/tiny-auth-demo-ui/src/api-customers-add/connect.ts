import { Dispatch } from "redux";
import { actionBinder } from "../crud-view";
import View, { ViewProps } from "./view";
import adapter from "./store";
import formStore from "./form-store";
import { connect } from "react-redux";
import { ComponentType } from "react";
import { createSelector } from "reselect";
/** */
const selector = createSelector(
  adapter.selector,
  formStore.selector,
  (state, formData) => ({ ...state, formData })
);
/** */
const bindActions = (dispatch: Dispatch) => {
  return {
    ...actionBinder(adapter.actions.setState)(dispatch),
    ...formStore.bindActions(dispatch)
  };
};
/** */
const Connected: ComponentType<ViewProps> = connect(
  selector,
  bindActions
)(View);
export default Connected;
