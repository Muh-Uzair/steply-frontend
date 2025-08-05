import React, { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface Props {
  children: ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  // VARS

  // FUNCTIONS

  // JSX
  return (
    <div>
      <Header />
      <main className="tab:pl-[80px] laptopM:pl-[200px]">{children}</main>
      <Sidebar />
    </div>
  );
};

export default AppLayout;
