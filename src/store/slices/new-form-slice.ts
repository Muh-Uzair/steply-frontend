import { INewFormSlice } from "@/types/new-form-slice-types";
import { createSlice } from "@reduxjs/toolkit";

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

    preferredContact: "Email",
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
    preferredContact: (state, action) => {
      state.formData.preferredContact = action.payload.preferredContact;
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

  currentJobTitle,
  employmentStatus,
  companyName,
  yearsOfExperience,

  monthlyIncome,
  preferredContact,
} = newFormSlice.actions;
export default newFormSlice.reducer;
