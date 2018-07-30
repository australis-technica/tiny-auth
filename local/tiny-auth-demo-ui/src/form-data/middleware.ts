import actionTypes from "./action-types";
import { Middleware, AnyAction } from "redux";
import createValidate, {
  ValidationRuleMap,
  ValidationResultMap
} from "./validate-form-data";
import createSelector from "./selector";
import { FormData, FormDataState } from "./types";
/** */
export default function<T extends FormData = FormData>(
  storeKey: string,
  rules: ValidationRuleMap,
  validationChangeAction: (validation: ValidationResultMap) => AnyAction
): Middleware {
  const { SET_STATE, VALIDATE } = actionTypes(storeKey);
  const selector = createSelector<FormDataState<T>>(storeKey);
  const validate = createValidate(rules);
  /** Middleware */
  const middleware: Middleware = store => next => action => {
    switch (action.type) {
      case SET_STATE:
      case VALIDATE: {
        next(action);
        const formData = selector(store.getState());
        return validate(formData).then(validation => {
          return next(validationChangeAction(validation));
        });
      }
      default:
        return next(action);
    }
  };
  return middleware;
}
