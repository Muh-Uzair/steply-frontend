"use client";

import LoadingSpinnerScreen from "@/components/LoadingSpinnerScreen";
import PageHeading from "@/components/PageHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetAllFormsQuery } from "@/store/api-slices/new-form-api-slice";
import { IIncomingFormFieldsAlForms } from "@/types/new-form-slice-types";
import Link from "next/link";
import React from "react";
import ErrorScreen from "@/components/ErrorScreen";

const AllForms: React.FC = () => {
  const {
    data,
    isLoading: isLoadingForms,
    isError: isErrorForms,
  } = useGetAllFormsQuery();

  const allForms: IIncomingFormFieldsAlForms[] | undefined = data?.data;

  if (isErrorForms) {
    return <ErrorScreen />;
  }

  if (isLoadingForms) {
    return <LoadingSpinnerScreen />;
  }

  if (!allForms || allForms.length === 0) {
    return (
      <div className="text-muted-foreground flex h-screen items-center justify-center">
        No forms found
      </div>
    );
  }

  return (
    <div className="laptopM:w-[800px] w-full max-w-[800px] flex-col space-y-4">
      <PageHeading>All Forms</PageHeading>
      <div className="mt-6 space-y-4">
        {allForms.map((form) => (
          <Card key={form._id} className="border shadow-sm">
            <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold">{form.fullName}</h3>
                <p className="text-muted-foreground text-sm">
                  {form.phoneNum} · {form.country}
                </p>
                <Badge variant="outline" className="mt-1">
                  {form.gender}
                </Badge>
              </div>

              <Link href={`/all-forms/${form._id}`}>
                <Button size="sm">View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllForms;
