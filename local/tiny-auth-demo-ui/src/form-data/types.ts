export type FormData = { [key: string]: any };

export interface FormDataState {
  formData: FormData;
}

export interface FormDataActions {
  setFormData({}): any;
}

export type FormDataProps = FormDataState & FormDataActions;
