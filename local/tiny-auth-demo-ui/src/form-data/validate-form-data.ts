import { FormData } from "./types";
import {
  isString,
  isFunction,
  isPromise,
  isRegExp,
  isStringArray,
  isBoolean,
  isStringNotEmpty,
  warn
} from "./util";

export interface ValidationResultMap {
  [key: string]: string | undefined;
}

export type ValidationFunc = (formData: FormData) => boolean | Promise<boolean>;

export type Validate = (formData: FormData) => Promise<ValidationResultMap>;

export type ValidateRule = (
  key: string,
  value: any
) => Promise<ValidationResultMap>;

export type ValidationRuleTest =
  | ValidationFunc
  | RegExp
  | string
  | boolean
  | string[];

/**
 * @returns OK
 */
export type ValidationRule = {
  test: ValidationRuleTest;
  message: ValidationMessage;
};

export type SetResulCallback = (key: string, value?: string) => any;

export type ValidationRuleMap = { [key: string]: ValidationRule };

export type ValidationMessage =
  | { [key: string]: string }
  | string
  | ((k: string) => string)
  | ((k: string) => Promise<string>)
  | Map<string, string>;

/**
 *
 */
export default function(rules: ValidationRuleMap): Validate {
  /**
   * TODO: cancel promise here ? if prev promise/key didn't resolve yet ? 
   */
  const getMessage = async (key: string, rule: ValidationRule): Promise<string> => {
    const { message } = rule;
    if (!message) {
      return Promise.reject(new Error("message/s is required"));
    }

    if (isString(message)) {
      return (message);
    }

    if (isFunction(message)) {
      const value = message(key);
      if (isPromise(value)) return value;
      return (value);
    }

    // is Object ?
    if (key in message) return (message[key]);
    if ("*" in message) return (message["*"]);

    return ("(!)");
  };
  /**
   * TODO: replace Promises with Subscription
   * or make Promise cancellable
   * cancel if previous promise/key didn't resove
   */
  const applyRules = (data: FormData) => {
    /**
     *
     */
    const applyRule = async (key: string, value: any, rule: ValidationRule) => {
      if (!rule) return ({ key, message: undefined });
      const { test } = rule;
      if (isFunction(test)) {
        let ok = test(data);
        ok = !isPromise(ok) ? ok : await ok;
        return ({
          key,
          message: ok ? undefined : await getMessage(key, rule)
        });
      }

      if (isRegExp(test)) {
        let ok = test.test(value);
        return {
          key,
          message: ok ? undefined : await getMessage(key, rule)
        };
      }

      if (isString(test)) {
        let ok = test.includes(value);
        return ({
          key,
          message: ok ? undefined : await getMessage(key, rule)
        });
      }

      if (isStringArray(test)) {
        let ok = test.indexOf(value) !== -1;
        return ({
          key,
          message: ok ? undefined : await getMessage(key, rule)
        });
      }

      if (!test || (isBoolean(test) && test)) {
        !test &&
          warn(
            "Test Rule without test, assuming 'required', use test=true if you meanit"
          );
        // assume means required !
        // not null not undefined not empty
        let ok = isStringNotEmpty(value);
        return ({
          key,
          message: ok ? undefined : await getMessage(key, rule)
        });
      }

      warn(new TypeError("Invalid rule type: (" + typeof test + ")"));
      return ({
        key,
        message: undefined
      });
    };

    const keys = Object.keys(data);
    return Promise.all(
      keys.map(key => applyRule(key, data[key], rules[key]))
    ).then(values =>
      values.reduce((out, next) => {
        out[next.key] = next.message;
        return out;
      }, {})
    );
  };
  return applyRules;
}
