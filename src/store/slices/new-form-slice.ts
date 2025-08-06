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
    currentJobTitle: "",
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
    currentJobTitle: (state, action) => {
      state.formData.currentJobTitle = action.payload.currentJobTitle;
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
  currentJobTitle,
  monthlyIncome,
  preferredContact,
} = newFormSlice.actions;
export default newFormSlice.reducer;
