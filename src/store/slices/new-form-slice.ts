import { IFormData } from "@/types/new-form-types";
import { createSlice } from "@reduxjs/toolkit";

interface INewFormSlice {
  step: number;
  formData: IFormData;
}

const initialState: INewFormSlice = {
  step: 1,
  formData: {
    fullName: "",
    password: "",
    confirmPassword: "",
    gender: "Male",
    dob: null,

    phoneNum: "",
    alternatePhoneNum: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    city: "",
    postalCode: "",

    currentJobTitle: "",
    employmentStatus: "Unemployed",
    companyName: "",
    yearsOfExperience: 0,
    resume: null,

    monthlyIncome: 0,
    loanStatus: "No",
    loanAmount: 0,
    creditScore: 0,

    preferredContact: "Email",
    hobbies: [],
    newsLetterSubscription: false,
  },
};

const newFormSlice = createSlice({
  name: "newForm",
  initialState,
  reducers: {
    incrementStep: (state) => {
      state.step += 1;
    },
    decrementStep: (state) => {
      state.step -= 1;
    },
    fullName: (state, action) => {
      state.formData.fullName = action.payload.fullName;
    },
    password: (state, action) => {
      state.formData.password = action.payload.password;
    },
    confirmPassword: (state, action) => {
      state.formData.confirmPassword = action.payload.confirmPassword;
    },
    gender: (state, action) => {
      state.formData.gender = action.payload.gender;
    },
    setDob: (state, action) => {
      const date: Date | undefined = new Date(action.payload.dob);
      state.formData.dob = date ? new Date(date).toISOString() : null;
    },

    phoneNum: (state, action) => {
      state.formData.phoneNum = action.payload.phoneNum;
    },
    alternatePhoneNum: (state, action) => {
      state.formData.alternatePhoneNum = action.payload.alternatePhoneNum;
    },
    addressLine1: (state, action) => {
      state.formData.addressLine1 = action.payload.addressLine1;
    },
    addressLine2: (state, action) => {
      state.formData.addressLine2 = action.payload.addressLine2;
    },
    country: (state, action) => {
      state.formData.country = action.payload.country;
    },
    city: (state, action) => {
      state.formData.city = action.payload.city;
    },
    postalCode: (state, action) => {
      state.formData.postalCode = action.payload.postalCode;
    },

    currentJobTitle: (state, action) => {
      state.formData.currentJobTitle = action.payload.currentJobTitle;
    },
    employmentStatus: (state, action) => {
      state.formData.employmentStatus = action.payload.employmentStatus;
    },
    companyName: (state, action) => {
      state.formData.companyName = action.payload.companyName;
    },
    yearsOfExperience: (state, action) => {
      state.formData.yearsOfExperience = action.payload.yearsOfExperience;
    },

    monthlyIncome: (state, action) => {
      state.formData.monthlyIncome = Number(action.payload.monthlyIncome);
    },
    loanStatus: (state, action) => {
      state.formData.loanStatus = action.payload.loanStatus;
    },
    loanAmount: (state, action) => {
      state.formData.loanAmount = Number(action.payload.loanAmount);
    },
    creditScore: (state, action) => {
      state.formData.creditScore = Number(action.payload.creditScore);
    },

    preferredContact: (state, action) => {
      state.formData.preferredContact = action.payload.preferredContact;
    },
    hobbies: (state, action) => {
      state.formData.hobbies = action.payload.hobbies;
    },
    newsLetterSubscription: (state, action) => {
      state.formData.newsLetterSubscription =
        action.payload.newsLetterSubscription;
    },
  },
});

export const {
  incrementStep,
  decrementStep,
  fullName,
  password,
  confirmPassword,
  gender,
  setDob,

  phoneNum,
  alternatePhoneNum,
  addressLine1,
  addressLine2,
  country,
  city,
  postalCode,

  currentJobTitle,
  employmentStatus,
  companyName,
  yearsOfExperience,

  monthlyIncome,
  loanStatus,
  loanAmount,
  creditScore,

  preferredContact,
  hobbies,
  newsLetterSubscription,
} = newFormSlice.actions;
export default newFormSlice.reducer;
