"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { incrementStep, decrementStep } from "@/store/slices/new-form-slice";
import { AppDispatch, RootState } from "@/store";

const NewForm: React.FC = () => {
  // VARS
  const dispatch = useDispatch<AppDispatch>();
  const { step } = useSelector((state: RootState) => state.newFormSliceReducer);

  // FUNCTIONS
  const handleNext = () => dispatch(incrementStep());
  const handlePrev = () => dispatch(decrementStep());

  // JSX
  return (
    <div>
      <section className="flex w-full justify-center items-center p-[30px]">
        <div className="w-[50px] h-[50px] flex justify-center items-center rounded-full bg-primary/30">
          <span className="text-primary text-3xl font-extrabold">{step}</span>
        </div>
      </section>
      <section>progress bars</section>
      <section>form</section>
      <section className="flex justify-end tab:justify-between items-center">
        <div className="hidden tab:inline">
          You&apos;re currently at step {step}
        </div>
        <div className="flex gap-2">
          <Button onClick={handlePrev} disabled={step === 1}>
            <ArrowLeft size={20} />
            Prev
          </Button>
          <Button onClick={handleNext} disabled={step === 6}>
            Next
            <ArrowRight size={20} />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default NewForm;
