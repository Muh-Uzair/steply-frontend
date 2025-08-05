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
import { Files, FilePlus, Menu } from "lucide-react";
import Link from "next/link";
import SteplyLogo from "./SteplyLogo";

const Header: React.FC = () => {
  // VARS

  // FUNCTIONS

  // JSX
  return (
    <header className="h-[50px] p-[10px] laptopM:hidden bg-stone-100 flex items-center justify-between border-b-[1px] border-primary">
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
              <Link href={"/all-forms"}>
                <DropdownMenuItem>
                  All Forms
                  <DropdownMenuShortcut>
                    <Files />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <Link href={"/new-form"}>
                <DropdownMenuItem>
                  New Form
                  <DropdownMenuShortcut>
                    <FilePlus />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
