import api from "./api";
import { connect } from "react-redux";
const selector = createSelector(api.selector, apiState => apiState);
import { createSelector } from "reselect";
import View from "./view";
/** */
const Connected = connect(
  selector,
  api.bindActions
)(View);
/** */
export default Connected;
