"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, Menu, User, LogOut } from "lucide-react";

import { useLayout } from "@/context/layout-context";
import Logo from "@/components/brand/logo";
import { logout } from "@/lib/actions/auth";

export default function AdminNavbar() {
  const { dispatch } = useLayout();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
  };

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
      <div className="min-w-[120px] flex items-center justify-end gap-2">
        <button className="relative p-2 rounded-full hover:text-primary">
          <Bell size={22} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100"
          >
            <div className="h-8 w-8 rounded-full bg-[#4196F0] flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                <LogOut className="h-4 w-4" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
