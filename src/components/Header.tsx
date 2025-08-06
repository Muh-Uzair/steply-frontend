"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";
import SteplyLogo from "./SteplyLogo";
import { navItems } from "@/lib/constants";
import { INavItem } from "@/types/constants-types";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  // VARS
  const navArr: INavItem[] = navItems;
  const pathname = usePathname();

  // FUNCTIONS

  // JSX
  return (
    <header className="h-[50px] p-[10px] z-30 laptopM:hidden fixed top-0 left-0 right-0 bg-stone-100 flex items-center justify-between border-b-[1px] border-primary">
      <div>
        <SteplyLogo />
      </div>
      <div className="tab:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Menu size={24} className="text-primary" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 m-[10px]" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {navArr.map((val, i) => {
                const IconComponent = val.navIcon;
                return (
                  <Link key={i} href={val.navUrl}>
                    <DropdownMenuItem
                      className={`${
                        pathname === val.navUrl ? "bg-stone-200/70" : ""
                      }`}
                    >
                      {val.navLabel}
                      <DropdownMenuShortcut>
                        <IconComponent className="text-primary" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                );
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
