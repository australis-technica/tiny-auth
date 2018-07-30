import createMiddleWare from "../form-data/middleware";
import formStore from "./form-store";
import store from "./store";
import { util } from "../form-data";
const rules = {
  description: {
    test: true,
    message: "description Required!"
  },
  displayName: {
    test: true,
    message: "Required"
  },
  name: {
    test: true,
    message: "Require"
  },
  notes: {
    test: true,
    message: "Require"
  },
  features: {
    test: true,
    message: "Require"
  }
};
const middleware = createMiddleWare(
  formStore.storeKey,
  rules,
  validation => {
    const validationEmpty = util.isValidationEmpty(validation);
    return store.actions.setState({ validation, validationEmpty });
  }
);
export default {
  middleware
};
