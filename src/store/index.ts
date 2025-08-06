import { configureStore } from "@reduxjs/toolkit";
import newFormSliceReducer from "@/store/slices/new-form-slice";

const store = configureStore({
  reducer: {
    newFormSliceReducer: newFormSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["newForm/setDob", "newForm/resume"],
      },
      ignoredPaths: [
        "newFormSliceReducer.formData.dob",
        "newFormSliceReducer.formData.resume",
      ],
      ignoredActionPaths: [
        "payload.dob",
        "payload.resume",
        "payload.resume.file",
      ],
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
