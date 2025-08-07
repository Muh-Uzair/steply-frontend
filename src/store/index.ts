import { configureStore } from "@reduxjs/toolkit";
import newFormSliceReducer from "@/store/slices/new-form-slice";
import { newFormApiSlice } from "@/store/api-slices/new-form-api-slice";

const store = configureStore({
  reducer: {
    newFormSliceReducer: newFormSliceReducer,
    [newFormApiSlice.reducerPath]: newFormApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(newFormApiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/*

import { configureStore } from "@reduxjs/toolkit";
import newFormSliceReducer from "@/store/slices/new-form-slice";
import { newFormApiSLice } from "./api-slices/new-form-api-slice";

const store = configureStore({
  reducer: {
    newFormSliceReducer: newFormSliceReducer,
    [newFormApiSLice.reducerPath]: newFormApiSLice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["newForm/setDob", "newForm/resume"],
        ignoredPaths: [
          "newFormSliceReducer.formData.dob",
          "newFormSliceReducer.formData.resume",
        ],
        ignoredActionPaths: [
          "payload.dob",
          "payload.resume",
          "payload.resume.file",
        ],
      },
    }).concat(newFormApiSLice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

 
 */
