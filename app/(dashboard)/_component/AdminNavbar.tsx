"use client";

import { Bell, Search, Menu } from "lucide-react";

import { useLayout } from "@/context/layout-context";
import Logo from "@/components/brand/logo";

export default function AdminNavbar() {
  const { dispatch } = useLayout();

  return (
    <header className="h-[72px] bg-white border-b flex items-center px-4 md:px-6 justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-3 min-w-[200px]">
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => dispatch({ type: "TOGGLE" })}
        >
          <Menu size={22} />
        </button>
        <div className="relative">
          <Logo />
          <span className="text-[8px] text-primary absolute left-11">
            Admin Portal
          </span>
        </div>

        <div className="hidden sm:block"></div>
      </div>

      {/* SEARCH */}
      <div className="flex-1 flex justify-self-start px-4 pl-10">
        <div className="relative w-full max-w-[720px]">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <input
            placeholder="Search"
            className="w-full h-[44px] pl-12 pr-4 rounded-xl bg-[#EFEFEF] outline-none"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="min-w-[60px] flex justify-end">
        <button className="relative p-2 rounded-full hover:text-primary">
          <Bell size={22} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}
