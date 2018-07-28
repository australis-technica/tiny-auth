import { Component, ReactNode } from "react";
import { FormDataProps, FormData } from "./types";
import validate, {
  ValidationResult,
  Validate,
  ValidationRuleMap,
  ValidationMessage
} from "./validate";

export type FormDataPropsExtended = FormDataProps & {
  validation: ValidationResult;
};

export interface FormDataParams {
  validationRules?: ValidationRuleMap;
  /**
   * messages map or default message
   */
  validationMessages?: ValidationMessage;
  render(props: FormDataPropsExtended): ReactNode;
  whenNoData?(props: FormDataProps): ReactNode;
}

type WithFormDataProps = FormDataProps & FormDataParams;

interface WithFormDataState {
  validation: ValidationResult;
}
/** */
class WithFormData extends Component<WithFormDataProps> {
  
  state: WithFormDataState = {
    validation: {}
  };

  setResult = (key: string, value?: string) => {
    const _ = {
      ...this.state.validation,
      [key]: value
    };
    this.setState({ validation: _ });
  };

  /** */
  hijacked = (values: Partial<FormData>) => {
    this.validate && this.validate(values);
    return this.props.setFormState(values);
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
      setFormState: this.hijacked
    };
  }
  /** */
  noData = () => {
    if (this.props.whenNoData) return this.props.whenNoData(this.props);
    return "No Form Data";
  };

  validate: Validate;

  componentDidMount() {
    const { validationMessages, validationRules, formData } = this.props;
    if (!validationRules) return;
    // init
    this.validate = validate(
      validationRules,
      validationMessages || "Not Valid",
      this.setResult
    );

    if (formData) this.validate(formData);
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
