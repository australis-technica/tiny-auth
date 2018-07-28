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

export interface ValidationResult {
  [key: string]: string;
}

export type ValidationFunc = (formData: FormData) => boolean | Promise<boolean>;

export type Validate = (formData: FormData) => any;

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

export default function(
  rules: ValidationRuleMap,
  message: ValidationMessage,
  callback: SetResulCallback
): Validate {
  /** */
  const getMessage = (key: string) => {
    
    if (!message) {
      return Promise.reject(new Error("message/s is required"));
    }

    if (isString(message)) {
      return Promise.resolve(message);
    }

    if (isMap(message)) {
      if (message.has(key)) return Promise.resolve(message.get(key))
      if (message.has("*")) return Promise.resolve(message.get("*"));
    }

    if (isFunction(message)) {
      const value = message(key);
      if (isPromise) return value;
      return Promise.resolve(value);
    }

    // is Object ? 
    if (key in message) return Promise.resolve(message[key]);
    if ("*" in message) return Promise.resolve(message["*"]);

    return Promise.resolve("(!)");
  };

  return function validate(formData: FormData) {
    /** */
    async function complete(key: string, ok: boolean) {
      const message = await getMessage(key);
      callback(key, !ok ? message : undefined);
    }
    /** */
    const processRule = async (key: string, rule: ValidationRule) => {
      if (isFunction(rule)) {
        let ok = rule(formData);
        ok = !isPromise(ok) ? ok : await ok;
        return complete(key, ok);
      }
      if (isRegExp(rule)) {
        let ok = rule.test(formData[key]);
        return complete(key, ok);
      }

      if (isString(rule)) {
        const value = formData[key] || "";
        let ok = value.includes(rule);
        return complete(key, ok);
      }

      if (isStringArray(rule)) {
        let ok = rule.indexOf(formData[key]) !== -1;
        return complete(key, ok);
      }

      if (isBoolean(rule)) {
        // assume means required !
        // not null not undefined not empty
        let ok = isStringNotEmpty(formData[key]);
        return complete(key, ok);
      }

      return Promise.reject(new TypeError("Invalid rule type"));
    };
    /** */
    const processRules = (values: Partial<FormData>) => {
      const keys = Object.keys(values);
      for (const key of keys) {
        const rule = rules[key];
        if (rule) {
          setTimeout(() => {
            processRule(key, rule);
          }, 1);
        }
      }
    };

    return processRules(formData);
  };
}
