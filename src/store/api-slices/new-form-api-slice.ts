import { IAllFormsResponse } from "@/types/new-form-slice-types";
import { IFormData, IFormsApiResponse } from "@/types/new-form-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newFormApiSlice = createApi({
  reducerPath: "newFormApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1" }),
  endpoints: (builder) => ({
    getAllForms: builder.query<IAllFormsResponse, void>({
      query: () => "/forms",
    }),
    createNewForm: builder.mutation<FormData, IFormData>({
      query: (formData) => {
        console.log(formData);
        const form = new FormData();

        // Append each field manually
        form.append("fullName", formData.fullName);
        form.append("password", formData.password);
        form.append("confirmPassword", formData.confirmPassword);
        form.append("gender", formData.gender);
        form.append("dob", formData.dob || "");
        form.append("phoneNum", formData.phoneNum);
        form.append("alternatePhoneNum", formData.alternatePhoneNum);
        form.append("addressLine1", formData.addressLine1);
        form.append("addressLine2", formData.addressLine2);
        form.append("country", formData.country);
        form.append("city", formData.city);
        form.append("postalCode", formData.postalCode);
        form.append("currentJobTitle", formData.currentJobTitle);
        form.append("employmentStatus", formData.employmentStatus);
        form.append("companyName", formData.companyName);
        form.append("yearsOfExperience", String(formData.yearsOfExperience));
        form.append("monthlyIncome", String(formData.monthlyIncome));
        form.append("loanStatus", formData.loanStatus);
        form.append("loanAmount", String(formData.loanAmount));
        form.append("creditScore", String(formData.creditScore));
        form.append("preferredContact", formData.preferredContact);
        form.append(
          "newsLetterSubscription",
          String(formData.newsLetterSubscription),
        );

        // Append hobbies as individual entries
        formData.hobbies.forEach((hobby) => form.append("hobbies", hobby));

        // ✅ Append the file (if it exists)
        if (formData.resume) {
          form.append("resume", formData.resume);
        }

        return {
          url: "/forms",
          method: "POST",
          body: form,
        };
      },
    }),
    getFormById: builder.query<IFormsApiResponse, string>({
      query: (id) => `/forms/${id}`,
    }),
  }),
});

export const {
  useGetAllFormsQuery,
  useCreateNewFormMutation,
  useGetFormByIdQuery,
} = newFormApiSlice;
