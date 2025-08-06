import { configureStore } from "@reduxjs/toolkit";
import newFormSliceReducer from "@/store/slices/new-form-slice";

const store = configureStore({
  reducer: {
    newFormSliceReducer: newFormSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["newForm/setDob"],
      },
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
