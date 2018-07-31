export type AnyData = { [key: string]: any };

export interface FormDataState<T extends AnyData = AnyData> {
  formData: T;
}

export interface FormDataActions {
  setFormState(x: {}): any;
  setFormValue(key: string, value: any): any;
  resetForm(): any;
  validate(): any;
}

export type FormDataProps<T extends AnyData = AnyData> = FormDataState<T> &
  FormDataActions;
