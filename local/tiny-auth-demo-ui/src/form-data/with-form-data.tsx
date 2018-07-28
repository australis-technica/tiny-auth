import { Component, ReactNode } from "react";
import { FormDataProps, FormData } from "./types";

import createValidate, {
  ValidationResultMap,
  ValidationRuleMap,
  ValidationMessage,
  Validate
} from "./validate";

export type FormDataPropsExtended = FormDataProps & {
  validation: ValidationResultMap;
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
  validation: ValidationResultMap;
}
/** */
class WithFormData extends Component<WithFormDataProps> {
  state: WithFormDataState = {
    validation: {}
  };
  /** */
  setFormState = (formData: Partial<FormData>) => {
    this.validate && this.validate(formData);
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

  validate: Validate;
  unmointing: boolean;
  componentWillUnmount() {
    this.unmointing = true;
  }
  componentDidMount() {
    const { validationMessages, validationRules, formData } = this.props;
    if (!validationRules) return;
    // init
    const validate = createValidate(
      validationRules,
      validationMessages || "Not Valid"
    );

    this.validate = (data: FormData) => {
      return validate(data).then(values => {
        if (this.unmointing) return values;
        const _ = {
          ...this.state.validation,
          ...values
        };
        this.setState({
          validation: _
        });
        return values;
      });
    };

    if (formData) {
      this.validate(formData);
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
