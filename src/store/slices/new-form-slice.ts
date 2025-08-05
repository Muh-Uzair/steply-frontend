import { INewFormSlice } from "@/types/new-form-slice-types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: INewFormSlice = {
  step: 1,
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
  },
});

export const { incrementStep, decrementStep } = newFormSlice.actions;
export default newFormSlice.reducer;
