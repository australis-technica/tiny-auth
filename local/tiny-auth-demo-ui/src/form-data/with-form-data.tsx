import { Component, ReactNode } from "react";
import { FormDataProps, FormData } from "./types";

import createValidate, {
  ValidationResultMap,
  ValidationRuleMap,
  Validate
} from "./validate-form-data";

export type FormDataPropsExtended = FormDataProps & {
  validation: ValidationResultMap;
};
/**
 * Exposed to receive parameters
 */
export interface FormDataParams {
  validationRules?: ValidationRuleMap;
  render(props: FormDataPropsExtended): ReactNode;
  whenNoData?(props: FormDataProps): ReactNode;
  onValidationChanged?(validation?: ValidationResultMap): any;
}

type WithFormDataProps = FormDataProps & FormDataParams;

interface WithFormDataState {
  validation: ValidationResultMap;
}
/** */
class WithFormData extends Component<WithFormDataProps> {
  state: WithFormDataState = {
    validation: {}
  };
  /** */
  setFormState = (formData: Partial<FormData>) => {
    this.validateFormData && this.validateFormData(formData);
    return this.props.setFormState(formData);
  };

  /**
   * extends props
   */
  extend() {
    const { validation } = this.state;
    const { setFormState, ...props } = this.props;
    return {
      validation,
      ...props,
      setFormState: this.setFormState
    };
  }
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
  onValidationChanged = (values: ValidationResultMap) => {
    if (this.unmounting) return values;
    const validation = Object.assign({}, this.state.validation, values);
    this.setState({ validation });
    if (this.props.onValidationChanged) {
      this.props.onValidationChanged(validation);
    }
    return values;
  };

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
