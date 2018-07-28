export type FormData = { [key: string]: any };

export interface FormDataState {
  formData: FormData;
}

export interface FormDataActions {
  setFormState(x: {}): any;  
}

export type FormDataProps = FormDataState & FormDataActions;
