import { PersistTransform } from "./persist";
/**
 *
 */
export interface DefaultOptions {  
  persist?: {
    off?: boolean;
    transform?: PersistTransform;
  };
}

const defaultOptions: DefaultOptions = {
  persist: {
    off: false,
    transform: undefined
  }
};
/**
 *
 */
export default defaultOptions;
