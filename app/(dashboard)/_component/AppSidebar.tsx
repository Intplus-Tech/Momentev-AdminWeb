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
  FileText,
  CalendarDays,
  LayersPlus,
} from "lucide-react";
import { useLayout } from "@/context/layout-context";

const menu = [
  { label: "Overview", icon: Home, href: "/overview" },
  { label: "Vendors", icon: Users, href: "/vendors" },
  { label: "Clients", icon: User, href: "/clients" },
  { label: "Financial", icon: Wallet, href: "/financial" },
  { label: "Bookings", icon: CalendarDays, href: "/bookings" },
  { label: "Requests", icon: FileText, href: "/customer-requests" },
  {
    label: "Disputes",
    icon: AlertTriangle,
    href: "/disputes",
    badge: 23,
  },
  { label: "Services", icon: LayersPlus, href: "/services" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

// Profile header component
function ProfileAvatar({
  name,
  email,
  role,
}: {
  name?: string;
  email?: string;
  role?: string;
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
    <Link
      href="/profile"
      className="flex items-center gap-3 mb-6 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors group"
    >
      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm shrink-0">
        {initials}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
          {name || "Admin User"}
        </p>
        <p className="text-[11px] text-muted-foreground truncate">
          {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Admin"}
          {email && ` · ${email}`}
        </p>
      </div>
    </Link>
  );
}

interface AppSidebarProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
}

export default function AppSidebar({ firstName, lastName, email, role }: AppSidebarProps) {
  const pathname = usePathname();
  const { state, dispatch } = useLayout();

  const fullName = firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || "Admin User";

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
        <ProfileAvatar name={fullName} email={email} role={role} />

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
