import { INewFormSlice } from "@/types/new-form-slice-types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: INewFormSlice = {
  step: 1,
  formData: {
    fullName: "",
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
  phoneNum,
  currentJobTitle,
  monthlyIncome,
  preferredContact,
} = newFormSlice.actions;
export default newFormSlice.reducer;
