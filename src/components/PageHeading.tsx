import React, { ReactNode } from "react";

interface IPageHeading {
  children: ReactNode;
}

const PageHeading: React.FC<IPageHeading> = ({ children }) => {
  // VARS

  // FUNCTIONS

  // JSX
  return (
    <section>
      <span className="text-2xl font-bold">{children}</span>
    </section>
  );
};

export default PageHeading;
