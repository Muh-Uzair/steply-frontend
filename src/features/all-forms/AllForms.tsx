"use client";

import { useGetAllFormsQuery } from "@/store/api-slices/new-form-api-slice";
// import { FormDataInstance } from "@/types/all-form-types";
import React from "react";

const AllForms: React.FC = () => {
  // VARS
  const { data } = useGetAllFormsQuery({});
  const allForms = data?.data;

  console.log(allForms);

  // FUNCTIONS

  // JSX
  return <div>All forms display</div>;
};

export default AllForms;
