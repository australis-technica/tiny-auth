import { Component, ReactNode } from "react";
import { FormDataProps, FormData } from "./types";
import createValidate, {
  ValidationResultMap,
  ValidationRuleMap,
  Validate
} from "./validate-form-data";

export type FormDataPropsExtended = FormDataProps & {
  // add propertities to passdown to children
};
/**
 * Exposed to receive parameters
 */
export interface FormDataParams {
  /**
   * if present validates
   */
  validationRules?: ValidationRuleMap;
  render(props: FormDataPropsExtended): ReactNode;
  whenNoData?(props: FormDataProps): ReactNode;
  /**
   * Validation callback
   */
  onValidationChanged?(validation?: ValidationResultMap): any;
}
/**
 * Parameters & external State
 */
type WithFormDataProps = FormDataProps & FormDataParams;

/** */
class WithFormData extends Component<WithFormDataProps> {
  
  /** */
  setFormState = (formData: Partial<FormData>) => {
    this.validateFormData && this.validateFormData(formData);
    return this.props.setFormState(formData);
  };

  /** */
  noData = () => {
    if (this.props.whenNoData) return this.props.whenNoData(this.props);
    throw new Error("No Form Data");
  };

  validateFormData: Validate;

  unmounting: boolean;
  componentWillUnmount() {
    this.unmounting = true;
  }
  /** */
  onValidationChanged = (validation: ValidationResultMap) => {
    if (this.props.onValidationChanged) {
      this.props.onValidationChanged(validation);
    }
    return validation;
  };
  /** */
  componentDidMount() {
    const { validationRules, formData } = this.props;
    if (!validationRules) return;
    // init
    const validate = createValidate(validationRules);    
    this.validateFormData = (data: FormData) => {
      // NOTE: TODO: ... cancel when new comes in if previous didn't resolve already ?
      // or let validator do that
      return validate(data).then(this.onValidationChanged);
    };    
    if (formData) {
      this.validateFormData(formData);
    }
  }
  /**
   * extends props
   */
  extend() {
    // const { validation } = this.props;
    const { setFormState, ...props } = this.props;
    return {
      // validation,
      ...props,
      setFormState: this.setFormState
    };
  }
  /** */
  render() {
    const { formData } = this.props;
    if (formData) {
      return this.props.render(this.extend());
    }
    return this.noData();
  }
}

export default WithFormData;
