"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { incrementStep, decrementStep } from "@/store/slices/new-form-slice";
import { AppDispatch, RootState } from "@/store";
import NewFormForm from "./NewFormForm";
import FormProgress from "./FormProgress";
import FormStepNum from "./FormStepNum";
import PageHeading from "@/components/PageHeading";

const NewForm: React.FC = () => {
  // VARS
  const dispatch = useDispatch<AppDispatch>();
  const { step } = useSelector((state: RootState) => state.newFormSliceReducer);

  // FUNCTIONS
  const handleNext = () => dispatch(incrementStep());
  const handlePrev = () => dispatch(decrementStep());

  // JSX
  return (
    <div className="laptopM:w-[800px] w-full max-w-[800px] flex-col space-y-4">
      <PageHeading>Fill up the form</PageHeading>
      <FormStepNum step={step} />
      <FormProgress step={step} />
      <NewFormForm step={step} />
      <section className="tab:justify-between my-[40px] flex items-center justify-end">
        <div className="tab:inline hidden h-full align-bottom">
          You&apos;re currently at step{" "}
          <span className="text-primary font-bold"> {step} </span>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={handlePrev}
            variant={"outline"}
            disabled={step === 1}
          >
            <ArrowLeft size={20} />
            Prev
          </Button>
          <Button
            variant={"outline"}
            onClick={handleNext}
            disabled={step === 6}
          >
            Next
            <ArrowRight size={20} />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default NewForm;
