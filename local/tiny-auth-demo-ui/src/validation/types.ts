
export type KeyOf<T> = keyof T & string;

export type ValidationResultMap<T> = { [k in KeyOf<T>]: string | undefined };

export type ValidationFunc<T> = (data: T) => boolean | Promise<boolean>;

export type Validate<T> = (data: T) => Promise<ValidationResultMap<T>>;

export type ValidateRule<T> = (
  key: string,
  value: any
) => Promise<ValidationResultMap<T>>;

export type ValidationRuleTest<T> =
  | ValidationFunc<T>
  | RegExp
  | string
  | boolean
  | string[];

/**
 * @returns OK
 */
export type ValidationRule<T> = {
  test: ValidationRuleTest<T>;
  message: ValidationMessage;
};

export type SetResulCallback<T> = (key: KeyOf<T>, value?: string) => any;

export type ValidationRuleMap<T> = { [key in KeyOf<T>]: ValidationRule<T> };

export type ValidationMessage =
  | { [key: string]: string }
  | string
  | ((k: string) => string)
  | ((k: string) => Promise<string>)
  | Map<string, string>;