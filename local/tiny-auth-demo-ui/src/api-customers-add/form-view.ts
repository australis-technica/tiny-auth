/**
 * another file
 */
import { connect } from "react-redux";
import { WithFormData } from "../form-data";
import store from "./form-store";
// ...
const FormView = connect(
  state => {
    const formData = store.selector(state);
    return {
      formData
    };
  },
  store.bindActions
)(WithFormData);
// ...
export default FormView;
