import { FormData } from "./types";

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

function isMap(x: any): x is Map<any, any> {
  return x instanceof Map || (x && isFunction(x.get) && isFunction(x.has));
}

export interface ValidationResultMap {
  [key: string]: string | undefined;
}

export type ValidationFunc = (formData: FormData) => boolean | Promise<boolean>;

export type Validate = (formData: FormData) => Promise<ValidationResultMap>;

export type ValidateRule = (
  key: string,
  value: any
) => Promise<ValidationResultMap>;

/**
 * @returns OK
 */
export type ValidationRule =
  | ValidationFunc
  | RegExp
  | string
  | boolean
  | string[];

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
export default function(
  rules: ValidationRuleMap,
  message: ValidationMessage
): Validate {
  /** */
  const getMessage = (key: string): Promise<string> => {
    if (!message) {
      return Promise.reject(new Error("message/s is required"));
    }

    if (isString(message)) {
      return Promise.resolve(message);
    }

    if (isMap(message)) {
      if (message.has(key)) return Promise.resolve(message.get(key) as string);
      if (message.has("*")) return Promise.resolve(message.get("*") as string);
    }

    if (isFunction(message)) {
      const value = message(key);
      if (isPromise(value)) return value;
      return Promise.resolve(value);
    }

    // is Object ?
    if (key in message) return Promise.resolve(message[key]);
    if ("*" in message) return Promise.resolve(message["*"]);

    return Promise.resolve("(!)");
  };
  /**
   * TODO: replace with Promises with Subscription
   * or make Promise cancellable
   */
  const validateRules = (data: FormData) => {
    /**
     *
     */
    const validateRule = async (
      key: string,
      value: any,
      rule: ValidationRule
    ) => {
      if (!rule) return Promise.resolve({ key, message: undefined });

      if (isFunction(rule)) {
        let ok = rule(data);
        ok = !isPromise(ok) ? ok : await ok;
        return Promise.resolve({
          key,
          message: ok ? undefined : await getMessage(key)
        });
      }

      if (isRegExp(rule)) {
        let ok = rule.test(value);
        return Promise.resolve({
          key,
          message: ok ? undefined : await getMessage(key)
        });
      }

      if (isString(rule)) {
        let ok = rule.includes(value);
        return Promise.resolve({
          key,
          message: ok ? undefined : await getMessage(key)
        });
      }

      if (isStringArray(rule)) {
        let ok = rule.indexOf(value) !== -1;
        return Promise.resolve({
          key,
          message: ok ? undefined : await getMessage(key)
        });
      }

      if (isBoolean(rule)) {
        // assume means required !
        // not null not undefined not empty
        let ok = isStringNotEmpty(value);
        return Promise.resolve({
          key,
          message: ok ? undefined : await getMessage(key)
        });
      }

      return Promise.reject(new TypeError("Invalid rule type"));
    };

    const keys = Object.keys(data);
    return Promise.all(
      keys.map(key => validateRule(key, data[key], rules[key]))
    ).then(values =>
      values.reduce((out, next) => {
        out[next.key] = next.message;
        return out;
      }, {})
    );
  };
  return validateRules;
}
