/**
 *
 */
import createStore, { AnyData } from "../form-data";
/** */
export interface ViewFormData extends AnyData {
  address: string;
  contact: string;
  description: string;
  email: string;
  enabled: boolean;
  displayName: string;
  name: string;
  notes: string;
  phone: string;
}
export type FormDataValidationResult = Partial<ViewFormData>;
/** */
const defaultState: ViewFormData = {
  address: "",
  contact: "",
  description: "",
  displayName: "",
  email: "",
  enabled: true,
  name: "",
  notes: "",
  phone: ""
};
const formDataStore = createStore("customer-add", defaultState, {});
export default formDataStore;
