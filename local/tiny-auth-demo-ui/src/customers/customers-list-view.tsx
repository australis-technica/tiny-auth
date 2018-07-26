import { connect } from "react-redux";
import { customers } from "../apis";
import { ComponentType } from "react";
import { ListView } from "../crud-view";
/**
 * 
 */
const ConstomerListView = connect(customers.selector, (dispatch) => {
  return {
    fetch: () => {
      dispatch(customers.actions.fetch({
        method: "GET",
        resultKey: "items"
      }))
    },
    clear: () => {
      dispatch(customers.actions.setResult([], {
        resultKey: "items"
      }))
    }
  }
})(ListView) as ComponentType<{}>;
/**
 * 
 */
export default ConstomerListView;