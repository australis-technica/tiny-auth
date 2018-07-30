/**
 * 
 */
import createStore, { FormData } from "../form-data";
/** */
export interface ViewFormData extends FormData {
  name: string;
  displayName: string;
  description: string;
  enabled: boolean;
  // Dest: JSON or comma separated list of string
  features: string;
  notes: string;
}
export type FormDataValidationResult = Partial<ViewFormData>
/** */
const defaultState: ViewFormData = {
  name: "",
  displayName: "",
  description: "",
  enabled: true,
  features: "",  
  notes: "",
};
const formDataStore = createStore("products-add", defaultState);
export default formDataStore;
