/**
 *
 */
import createStore, { AnyData } from "../form-data";
/** */
export interface ViewFormData extends AnyData {
  /** Customer ID */
  customer: string; // 1024
  /**TODO: currently a string*/
  // createdAT: number,
  displayName: string; // 256
  description: string;
  enabled: boolean;
  // Extra: Not in DB Dto 
  features: string;  
  /** internal */
  id: string,
  /** 4000 */
  notes: string; 
  /** Internal Hidden by api */
  // token: string,
  /** TODO: currently a string */
  // updatedAt:  number,
  /** Product ID */
  product: string;
}
/** */
const defaultState: ViewFormData = {
  customer: "",  
  displayName: "",
  description: "",
  enabled: true,
  features: "",
  id: "",
  notes: "",
  product: "",
};
const formDataStore = createStore<ViewFormData>("licenses-add", defaultState);
export default formDataStore;
