import React from "react";

interface Props {
  step: number;
}

const NewFormForm: React.FC<Props> = ({ step }) => {
  // VARS
  console.log(step);

  // FUNCTIONS

  // JSX
  return <div>form</div>;
};

export default NewFormForm;
