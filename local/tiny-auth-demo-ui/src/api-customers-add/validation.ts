import {
  middleware as validationMiddleware,
  isValidationEmpty,
  ValidationRuleMap,
  EMAIL_REGEX
} from "../validation";
import formStore, { ViewFormData } from "./form-store";
import store from "./store";

const rules: ValidationRuleMap<ViewFormData> = {
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
    test: EMAIL_REGEX,
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
const middleware = validationMiddleware(
  rules,
  [formStore.actionTypes.VALIDATE, formStore.actionTypes.SET_STATE],
  formStore.selector,
  validation => {
    const validationEmpty = isValidationEmpty(validation);
    return store.actions.setState({ validation, validationEmpty });
  }
);
export default {
  middleware
};
