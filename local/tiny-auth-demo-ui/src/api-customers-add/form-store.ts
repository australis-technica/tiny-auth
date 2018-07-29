/**
 * 
 */
import createStore from "../form-data";
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
