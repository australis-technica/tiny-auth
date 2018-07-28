import { Component, ReactNode } from "react";
import { FormDataProps, FormData } from "./types";

export const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

function isPromise(x: any): x is Promise<any> {
  return typeof x === "function" && typeof x.then === "function";
}

function isFunction(x: any): x is Function {
  return typeof x === "function";
}

function isRegExp(x: any): x is RegExp {
  return x instanceof RegExp;
}

function isString(x: any): x is string {
  return typeof x === "string";
}

function isStringNotEmpty(x: any): x is string {
  return isString(x) && x.trim() !== "";
}

function isStringArray(x: any): x is string[] {
  return Array.isArray(x) && !x.find(y => !isString(y));
}

function isBoolean(x: any): x is boolean {
  return typeof x === "boolean";
}

export interface ValidationResult {
  [key: string]: string;
}

export type FormDataPropsExtended = FormDataProps & {
  validation: ValidationResult;
};

export type ValidationFunc = (formData: FormData) => boolean | Promise<boolean>;

/**
 * @returns OK
 */
export type ValidationRule =
  | ValidationFunc
  | RegExp
  | string
  | boolean
  | string[];

export interface FormDataParams {
  validationRules?: {
    [key: string]: ValidationRule;
  };
  validationMessages?: {
    [key: string]: string;
  };
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

  updateResult = (key: string) => (value?: string) => {
    const _ = {
      ...this.state.validation,
      [key]: value
    };
    this.setState({ validation: _ });
  };

  setResult = (key: string, r?: string | Promise<string>) => {
    if (isPromise(r)) {
      return r.then(this.updateResult(key));
    }
    return this.updateResult(key)(r);
  };

  get defaultMessage() {
    // if(this.props.xxx ) return this.props.xxx
    return "Not Valid";
  }

  message = (key: string) => {
    const { validationMessages } = this.props;
    if (!validationMessages) {
      return this.defaultMessage;
    }
    const m = validationMessages[key];
    return m || this.defaultMessage;
  };

  validate = (key: string, rule: ValidationRule) => {
    const { formData } = this.props;
    if (isFunction(rule)) {
      return this.setResult(
        key,
        (!rule(formData) && this.message(key)) || undefined
      );
    }

    if (isRegExp(rule)) {
      return this.setResult(
        key,
        (!rule.test(formData[key]) && this.message(key)) || undefined
      );
    }

    if (isString(rule)) {
      const value = formData[key] || "";
      return this.setResult(
        key,
        (!value.includes(rule) && this.message(key)) || undefined
      );
    }

    if (isStringArray(rule)) {
      return this.setResult(
        key,
        (rule.indexOf(formData[key]) !== -1 && this.message(key)) || undefined
      );
    }

    if (isBoolean(rule)) {
      // assume means required !
      // not null not undefined not empty
      return this.setResult(
        key,
        (!isStringNotEmpty(formData[key]) && this.message(key)) || undefined
      );
    }
  };
  /** */
  processRules(values: Partial<FormData>) {
    if (this.props.validationRules) {
      const keys = Object.keys(values);
      for (const key of keys) {
        const rule = this.props.validationRules[key];
        if (rule) {
          setTimeout(() => {
            this.validate(key, rule);
          }, 1);
        }
      }
    }
  }
  /** */
  hijacked = (values: Partial<FormData>) => {
    this.processRules(values);
    return this.props.setFormData(values);
  };

  /**
   * extends props
   */
  extend() {
    const { validation } = this.state;
    const { setFormData, ...props } = this.props;
    return {
      validation,
      ...props,
      setFormData: this.hijacked
    };
  }
  /** */
  noData = () => {
    if (this.props.whenNoData) return this.props.whenNoData(this.props);
    return "No Form Data";
  };
  componentDidMount() {
    if (this.props.formData) this.processRules(this.props.formData);
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
