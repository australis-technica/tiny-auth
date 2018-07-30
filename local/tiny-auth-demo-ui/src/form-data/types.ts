export type FormData = { [key: string]: any };

export interface FormDataState<T extends FormData = FormData> {
  formData: T;
}

export interface FormDataActions {
  setFormState(x: {}): any;
  setFormValue(key: string, value: any): any;
  resetForm(): any;
  validate(): any;
}

export type FormDataProps<T extends FormData = FormData> = FormDataState<T> &
  FormDataActions;
