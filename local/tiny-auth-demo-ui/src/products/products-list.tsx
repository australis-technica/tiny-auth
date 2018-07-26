import { connect } from "react-redux";
import { products } from "../apis";
import { ComponentType } from "react";
import { ListView } from "../crud-view";
/**
 * 
 */
const ProductListView = connect(products.selector, (dispatch) => {
  return {
    fetch: () => {
      dispatch(products.actions.fetch({
        method: "GET",
        resultKey: "items"
      }))
    },
    clear: () => {
      dispatch(products.actions.setResult([], {
        resultKey: "items"
      }))
    }
  }
})(ListView) as ComponentType<{}>;
/**
 * 
 */
export default ProductListView;