import { connect } from "react-redux";
import { createSelector } from "reselect";
import adapter from "./api";
import View from "./view";

const selector = createSelector(adapter.selector, apiState => apiState);

const Connected = connect(
    selector,
    adapter.bindActions
  )(View);
  /**
   *
   */
  export default Connected;