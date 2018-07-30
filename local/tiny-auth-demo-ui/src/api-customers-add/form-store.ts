/**
 * 
 */
import createStore, { FormData } from "../form-data";
/** */
export interface ViewFormData extends FormData {
  contact: string,
  description: string,
  email: string,
  enabled: boolean,
  displayName: string,
  name: string,
  notes: string
  phone: string,
}
export type FormDataValidationResult = Partial<ViewFormData>
/** */
const defaultState: ViewFormData = {
  contact: "",
  description: "",
  displayName: "",
  email: "",
  enabled: true,
  name: "",
  notes: "",
  phone: "",
};
const formDataStore = createStore("customer-add", defaultState, {});
export default formDataStore;
