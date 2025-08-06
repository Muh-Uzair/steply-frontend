export interface IFormData {
  fullName: string;
  password: string;
  confirmPassword: string;
  gender: "Male" | "Female" | "Other";
  dob: "";
  phoneNum: string;
  currentJobTitle: string;
  monthlyIncome: number;
  preferredContact: "Email" | "Phone" | "SMS";
}
