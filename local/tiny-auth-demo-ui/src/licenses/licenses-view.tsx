import { connect } from "react-redux";
import { licenses } from "../apis";
import { ComponentType } from "react";
import { ListView } from "../crud-view";
/**
 * 
 */
const ConstomerListView = connect(licenses.selector, (dispatch) => {
  return {
    fetch: () => {
      dispatch(licenses.actions.fetch({
        method: "GET",
        resultKey: "items"
      }))
    },
    clear: () => {
      dispatch(licenses.actions.setResult([], {
        resultKey: "items"
      }))
    }
  }
})(ListView) as ComponentType<{}>;
/**
 * 
 */
export default ConstomerListView;