/**
 * 
 */
import createStore, { WithFormData } from "../form-data";
const defaultState = {
  contact: "",
  phone: "",
  enabled: true,
  displayName: "",
  email: "",
  description: ""
};
const formDataStore = createStore("customer-add", defaultState, {});
export default formDataStore;
/**
 * another file
 */
import { connect } from "react-redux";
const FormData = connect(
  state => {
    const formData = formDataStore.selector(state);
    return {
      formData
    };
  },
  formDataStore.bindActions
)(WithFormData);
export {
    FormData
}
