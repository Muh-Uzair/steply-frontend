"use client";

import { navItems } from "@/lib/constants";
import { INavItem } from "@/types/constants-types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import SteplyLogo from "./SteplyLogo";

const Sidebar: React.FC = () => {
  // VARS
  const navArr: INavItem[] = navItems;
  const pathname = usePathname();

  console.log(pathname);

  // FUNCTIONS

  // JSX
  return (
    <aside className="bg-primary laptopM:w-[200px] tab:block fixed laptopM:top-[0px] top-[50px] bottom-0 left-0 hidden w-[80px] p-[10px]">
      <section className="laptopM:flex justify-center items-center p-[20px] hidden">
        <SteplyLogo />
      </section>

      <section>
        <nav>
          <ul className="mt-[20px] flex flex-col space-y-4  text-white">
            {navArr.map((val, i) => {
              const IconComponent = val.navIcon;
              return (
                <li key={i}>
                  <Link
                    href={val.navUrl}
                    className={`cursor-pointer flex items-center justify-center laptopM:justify-start gap-2 p-[10px] rounded-sm ${
                      pathname === val.navUrl ? "bg-violet-800" : ""
                    }`}
                  >
                    <IconComponent size={20} />
                    <span className="laptopM:inline hidden">
                      {val.navLabel}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </section>
    </aside>
  );
};

export default Sidebar;
