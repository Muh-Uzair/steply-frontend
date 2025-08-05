import React from "react";

interface Props {
  step: number;
}

const FormStepNum: React.FC<Props> = ({ step }) => {
  // VARS

  // FUNCTIONS

  // JSX
  return (
    <section className="flex w-full justify-center items-center p-[30px]">
      <div className="w-[50px] h-[50px] flex justify-center items-center rounded-full bg-primary/30">
        <span className="text-primary text-3xl font-extrabold">{step}</span>
      </div>
    </section>
  );
};

export default FormStepNum;
