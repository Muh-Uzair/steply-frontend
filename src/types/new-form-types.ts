// Base form data interface
export interface IFormData {
  fullName: string;
  password: string;
  confirmPassword: string;
  gender: "Male" | "Female" | "Other";
  dob: string | null;

  phoneNum: string;
  alternatePhoneNum: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  city: string;
  postalCode: string;

  currentJobTitle: string;
  employmentStatus: "Employed" | "Unemployed" | "Student";
  companyName: string;
  yearsOfExperience: number;
  resume: File | null; // For form submission

  monthlyIncome: number;
  loanStatus: "Yes" | "No";
  loanAmount: number;
  creditScore: number;

  preferredContact: "Email" | "Phone" | "SMS";
  hobbies: string[];
  newsLetterSubscription: boolean;
}

// Interface for resume data coming from backend
export interface IResumeData {
  base64: string;
  mimetype: string;
  originalname: string;
  size: number;
}

// Interface for form data received from backend (with processed resume)
export interface IFormDataResponse
  extends Omit<IFormData, "resume" | "password" | "confirmPassword"> {
  resume: IResumeData | null;
}

// For backward compatibility
export interface IFormDataWithId extends IFormDataResponse {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// API Response interface
export interface IFormsApiResponse {
  status: "success" | "error";
  message: string;
  data: IFormDataWithId;
}
