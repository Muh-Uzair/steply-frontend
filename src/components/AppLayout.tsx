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
      <main className="tab:pl-[80px] laptopM:pl-[200px] flex justify-center">
        <div className=" px-[10px] tab:px-[50px] laptopM:px-0 laptopM:max-w-[1200px]  w-full flex justify-center">
          {children}
        </div>
      </main>
      <Sidebar />
    </div>
  );
};

export default AppLayout;
