export interface IIncomingFormFieldsAlForms {
  _id: string;
  fullName: string;
  gender: "Male" | "Female" | "Other";
  phoneNum: string;
  country: string;
}

export interface IAllFormsResponse {
  message: "success" | "error";
  data: IIncomingFormFieldsAlForms[];
}
