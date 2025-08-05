import { Progress } from "@/components/ui/progress";
import React from "react";

interface Props {
  step: number;
}

const FormProgress: React.FC<Props> = ({ step }) => {
  // VARS

  // FUNCTIONS

  // JSX
  return (
    <section>
      <Progress value={(step / 6) * 100} max={60} />
    </section>
  );
};

export default FormProgress;
