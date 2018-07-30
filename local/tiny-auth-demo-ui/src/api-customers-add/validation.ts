import { validation } from "../form-data";
import formStore from "./form-store";
import store from "./store";
import { util } from "../form-data";
const rules = {
  address: {
    test: true,
    message: "Required"
  },
  contact: {
    test: true,
    message: "Require"
  },
  description: {
    test: true,
    message: "description Required!"
  },
  displayName: {
    test: true,
    message: "Required"
  },
  email: {
    test: util.EMAIL_REGEX,
    message: "Invalid email"
  },
  name: {
    test: true,
    message: "Require"
  },
  notes: {
    test: true,
    message: "Require"
  },
  phone: {
    test: true,
    message: "Require"
  }
};
const middleware = validation(formStore.storeKey, rules, validation => {
  const validationEmpty = util.isValidationEmpty(validation);
  return store.actions.setState({ validation, validationEmpty });
});
export default {
  middleware
};
