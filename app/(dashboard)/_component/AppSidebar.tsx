"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  User,
  Wallet,
  AlertTriangle,
  Settings,
} from "lucide-react";
import { useLayout } from "@/context/layout-context";

const menu = [
  { label: "Overview", icon: Home, href: "/overview" },
  { label: "Vendors", icon: Users, href: "/vendors" },
  { label: "Clients", icon: User, href: "/clients" },
  { label: "Financial", icon: Wallet, href: "/financial" },
  {
    label: "Disputes",
    icon: AlertTriangle,
    href: "/disputes",
    badge: 23,
  },
  { label: "Settings", icon: Settings, href: "/settings" },
];

// Profile fallback component
function ProfileAvatar({
  name,
  subdomain,
}: {
  name?: string;
  subdomain?: string;
}) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AD";

  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-medium text-sm">
        {initials}
      </div>
      <div>
        <p className="font-medium text-sm">{name || "Admin User"}</p>
        <p className="text-[10px] text-muted-foreground">
          {subdomain || "admin.momentev.com"}
        </p>
      </div>
    </div>
  );
}

export default function AppSidebar() {
  const pathname = usePathname();
  const { state, dispatch } = useLayout();

  // TODO: Replace with real user data from auth context
  const user = {
    name: "Michelle Adeyemi",
    subdomain: "thelusyfashion.momentev.com",
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {state.sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => dispatch({ type: "CLOSE" })}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed md:static
          z-50
          top-[72px]
          w-[260px]
          h-[calc(100vh-72px)]
          bg-white
          px-4 py-6
          overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${state.sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
        aria-label="Main navigation"
      >
        {/* PROFILE */}
        <ProfileAvatar name={user.name} subdomain={user.subdomain} />

        {/* MENU */}
        <nav className="space-y-1" role="navigation">
          {menu.map((item) => {
            // Improved active detection
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href + "/"));

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => dispatch({ type: "CLOSE" })}
                className={`relative flex items-center gap-3 px-3 py-3 rounded-md transition-colors
                  ${isActive ? "text-primary bg-primary/5" : "text-gray-600"}
                  hover:text-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <span className="absolute left-0 h-full w-[3px] bg-primary rounded-r" />
                )}
                <item.icon size={18} />
                <span className="flex-1 text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
