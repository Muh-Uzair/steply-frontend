import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newFormApiSLice = createApi({
  reducerPath: "newFormApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1" }),
  endpoints: (builder) => ({
    getAllForms: builder.query({
      query: () => `/forms`,
    }),
  }),
});

export const { useGetAllFormsQuery } = newFormApiSLice;
